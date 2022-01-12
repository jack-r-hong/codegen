// // extern crate yaml_rust;
// use std::env;
// use std::fs;
// use std::io::prelude::*;
// use yaml_rust::{YamlLoader};

// fn main() -> std::io::Result<()> {
//     let args: Vec<String> = env::args().collect();


//     let filename = &args[1];
//     println!("In file {}", filename);

//     let mut file = File::create("foo.txt")?;

//     // let contents = fs::read_to_string(filename)
//     // .expect("Something went wrong reading the file");

//     // let docs = YamlLoader::load_from_str(&contents).unwrap();
//     // let doc = &docs[0];

//     // for (key, val) in doc["paths"].as_hash().unwrap() {

//     //     file.write_all(key.as_str().unwrap().as_bytes()).expect("Unable to write data");
//     //     // println!("{}", key.as_str().unwrap());
//     //     // println!("{:?}", val.as_hash().unwrap());
//     // }

//     // turns into this:

    


    
//     // let mut contents = String::new();
    
//     Ok(())
// }




extern crate yaml_rust;
extern crate env_logger;
extern crate handlebars;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;

use std::env;
use std::error::Error;
use std::fs;
use std::fs::File;
// use std::collections::HashMap;
use std::fmt;
// use std::io::prelude::*;
use yaml_rust::{YamlLoader, Yaml};


use serde_json::value::{Map, Value as Json};

use handlebars::{
    to_json, Handlebars,
};
use codegen::{
    format_helper, 
    format_pascal_case_helper, 
    each_parameter_helper,
    path_parameter_helper,
    parameter_type_helper,
    is_int_helper,
    format_snake_case_helper,
    id_default_helper,
    ref_helper,
    foreign_key_helper,
    
};



static TYPES: &'static str = "serde_json";

// define some data
#[derive(Serialize)]
pub struct Team {
    name: String,
    pts: u16,
}

#[derive(Debug, Clone, Copy)]
enum Location {
    Header,
    Path,
    Query,
    Body
}


impl fmt::Display for Location {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Location::Header => write!(f, "header"),
            Location::Path => write!(f, "params"),
            Location::Query => write!(f, "query"),
            Location::Body => write!(f, "body")
        }
    }
}

#[derive(Serialize, Debug, Clone, Copy)]
pub enum ParameterType {
    String,
    Integer,
    Array,
    Object
}

impl fmt::Display for ParameterType {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            ParameterType::String => write!(f, "string"),
            ParameterType::Integer => write!(f, "integer"),
            ParameterType::Array => write!(f, "array"),
            ParameterType::Object => write!(f, "body")
        }
    }
}

#[derive( Debug, Serialize)]
pub struct Schema {
    data_type: ParameterType,
    // items: Option<Vec<Schema>>,
    properties: Option<Map<String,Json>>
}

impl Schema {
    pub fn set_type(data_type: ParameterType) -> Self {
        Self {
            data_type,
            // items: None,
            properties: None
        }
    }

    pub fn set_properties(key: String, properties:Schema ) -> Self {
        // "sss", to_json(properties)
        let mut data = Map::new();
        data.insert("properties".to_string(), to_json(properties));
        Self {
            data_type: ParameterType::Object,
            // items: None,
            properties: Some(data) 
        }
    }

    // pub fn set_items(items:Schema ) -> Self {
    //     Self {
    //         data_type: ParameterType::Array,
    //         items: items,
    //         properties: None
    //     }
    // }
}


#[derive( Debug, Serialize)]
pub struct Parameter {
    name: String,
    location: String,
    required: bool,
    schema: Schema
    // schema: String
}

#[derive(Serialize)]
pub struct Operation {
    id: String,
    path: String,
    method: String
}
#[derive(Serialize, Debug)]
pub struct ApiPath {
    path: String,
    method: String,
    operation_id: String,
    parameters: Vec<Parameter>,
}


fn swagger_loder() -> Yaml{
    let args: Vec<String> = env::args().collect();


    let filename = &args[1];
    println!("In file {}", filename);



    let contents = fs::read_to_string(filename)
    .expect("Something went wrong reading the file");

    let docs = YamlLoader::load_from_str(&contents).unwrap();
    let doc = &docs[0];
    // println!("{}", doc);
    doc.clone()
    

    // println!("{:?}", doc["openapi"].as_hash().unwrap());
    // println!("{:?}", doc["info"].as_hash().unwrap());
    // println!("{:?}", doc["externalDocs"].as_hash().unwrap());
    // println!("{:?}", doc["servers"].as_hash().unwrap());
    // println!("{:?}", doc["tags"].as_hash().unwrap());
    // println!("{:?}", doc["paths"].as_hash().unwrap());

    // for (key, val) in doc["paths"].as_hash().unwrap() {

    //     println!("{}", key.as_str().unwrap());
    //     println!("{:?}", key.as_str().unwrap());
    // }
}

// produce some data
pub fn make_data(swagger_yaml :&Yaml, tag :String) -> Map<String, Json> {
    let mut data = Map::new();

    let paths = swagger_yaml["paths"].as_hash().unwrap();

    let mut swagger_data = Vec::new();
    

    for (path, v1) in paths {
        for (method, v2) in v1.as_hash().unwrap() {
            let mut v = vec![];
            let mut parameters = vec![];
            for e in v2["parameters"].as_vec().unwrap_or(&v) {
                // ["name"].as_str().unwrap()
                
                let schema = match e["schema"]["type"].as_str(){
                    // "array" -> Schema::set_type(ParameterType::Array : ParameterType),
                    // "object" -> Schema::set_type(data_type: String),
                    Some("string") =>  Schema::set_type(ParameterType::String),
                    Some("integer") => Schema::set_type(ParameterType::Integer),
                    _ => Schema::set_type(ParameterType::Integer)
                };

                // println!("{:?}",schema);

                parameters.push(
                    Parameter{
                        name:  e["name"].as_str().unwrap().to_string(),
                        location: e["in"].as_str().unwrap().to_string(),
                        required: e["required"].as_bool().unwrap(),
                        schema: schema
                    }
                );
            }
            // println!("{:?}",parameters);

            if  v2["tags"].as_vec().unwrap()[0].as_str().unwrap().to_string() == tag {
                swagger_data.push(
                    ApiPath{
                        path: path.as_str().unwrap().to_string(),
                        method: method.as_str().unwrap().to_string(),
                        operation_id: v2["operationId"].as_str().unwrap().to_string(),
                        parameters: parameters
                    }                
                );                
            }

        }
    }

    // println!("{:?}", swagger_data);
    
    data.insert("data".to_string(), to_json(swagger_data));


    data

}

fn unfold(hash :&Yaml) -> Map<String, Json>{
    // println!("{:?}", hash);
    // println!("{:?}", hash.as_str());

    // let rusult = Schema{
    //     data_type: ParameterType,
    //     properties: Option<Map<String,Json>>       
    // }
    let mut data = Map::new();
    let mut data2  = Map::new();
    // let mut mtm_tables = vec!();
    
    
    let d = match hash["type"].as_str() {
        Some("object") => {
            // println!("{:?}", hash["properties"].as_hash().unwrap() );
            
            for (key, v) in hash["properties"].as_hash().unwrap(){
                // println!("{:?}", key.as_str().unwrap() );
                data2.insert(key.as_str().unwrap().to_string() , to_json( unfold(v)));
            }
            data2
        },
        Some("array") => {
            data2.insert("type".to_string(), to_json("array".to_string()));
            let mut data3  = Map::new();
            for (key, v) in hash["items"].as_hash().unwrap(){
                data3.insert(key.as_str().unwrap().to_string(), to_json(v.as_str().unwrap().to_string()));
                // vec.push(v.as_str().unwrap().to_string());
            }   

            data2.insert("items".to_string() , to_json(data3));
            // println!("{:?}", data2);  
            data2    
               
        },
        None => {
            for (key, v) in hash.as_hash().unwrap(){
                data2.insert(key.as_str().unwrap().to_string(), to_json(v.as_str().unwrap().to_string()));
            }   
            data2        
        },

        _  => {
            for (key, v) in hash.as_hash().unwrap(){
                if key.as_str().unwrap() == "enum"{
                    let mut vec = vec!();
                    
                    for val in v.as_vec().unwrap(){
                        vec.push(val.as_str().unwrap().to_string());
                    }
                    data2.insert("enum".to_string() , to_json(vec));
                    println!("{:?}", data2);
                }else{
                    data2.insert(key.as_str().unwrap().to_string() , to_json(v.as_str().unwrap().to_string()));
                }
            }
            data2
        }

    };
// println!("{:?}", d);
    d
}

pub fn make_schema_data(swagger_yaml :&Yaml) -> Map<String, Json> {
    let mut data = Map::new();
    let mut data2 = Map::new();
    let mut mtm_tables = vec!();

    let schemas = swagger_yaml["components"]["schemas"].as_hash().unwrap();

    for (schema, v1) in schemas {
        data2.insert(schema.as_str().unwrap().to_string(), to_json(unfold(v1)) );
    }
    
    data2.clone()
    .iter()
    .for_each(|(k1, v1)| {
        for (k2, v2) in v1.as_object().unwrap(){
            for (k3, v3) in v2.as_object().unwrap(){
                if k3.as_str() == "items" {
                    for (k4, v4) in v3.as_object().unwrap(){
                        if k4.as_str() == "$ref"{
                            let refTarget =  v4.as_str().unwrap().replace("#/components/schemas/", "");
                                let mut d = Map::new();
                                d.insert("name".to_string(), to_json(k2.as_str().to_owned() + "On" +  k1) );
                                d.insert("t1".to_string(), to_json(refTarget));
                                d.insert("t2".to_string(), to_json(k1));  
                                mtm_tables.push(d);                         
                        }
                    }
                }
            }

        }
    });

    data.insert("data".to_string(), to_json(data2));
    data.insert("mtm_tables".to_string(), to_json(mtm_tables));
    data
}
#[derive(Serialize, Debug)]
struct RenderData{
    tag: String,
    data: Map<String, Json>
}


fn main() -> Result<(), Box<dyn Error>> {
    env_logger::init();

    

    // create the handlebars registry
    let mut handlebars = Handlebars::new();

    // register template from a file and assign a name to it
    // deal with errors
    
    // register some custom helpers
    handlebars.register_helper("format", Box::new(format_helper));
    // handlebars.register_helper("ranking_label", Box::new(rank_helper));
    handlebars.register_helper("fpc", Box::new(format_pascal_case_helper));
    handlebars.register_helper("each_parameter", Box::new(each_parameter_helper));
    handlebars.register_helper("parameter_type", Box::new(parameter_type_helper));
    handlebars.register_helper("is_int", Box::new(is_int_helper));
    handlebars.register_helper("snake_case", Box::new(format_snake_case_helper));
    handlebars.register_helper("id_default", Box::new(id_default_helper));
    handlebars.register_helper("ref", Box::new(ref_helper));
    handlebars.register_helper("foreign_key", Box::new(foreign_key_helper));
    // handlebars.register_helper("many_to_many", Box::new(many_to_many_helper));
    
    
    

    handlebars.register_helper("path_parameter_format", Box::new(path_parameter_helper));

    let swagger_yaml = swagger_loder();

    let tags = swagger_yaml["tags"].clone();
    // println!("{:?}", tags);

    // make_schema_data(&swagger_yaml);

    // println!("{:?}", make_schema_data(&swagger_yaml));

    
    let api_path = "../server/src/apiModules";
    let model_path = "../server/src/models";
    let template_path = "./src/templates/";

    for tag in tags.as_vec().unwrap() {
        let render_data = RenderData{
            tag: tag["name"].as_str().unwrap().to_string(),
            data: make_data(&swagger_yaml, tag["name"].as_str().unwrap().to_string())
        };

        // controller
        handlebars.register_template_file("controller", template_path.to_owned()+"controller.hbs")?;
        fs::create_dir_all(api_path.to_owned() + "/" + tag["name"].as_str().unwrap() )?;
        let mut output_controller = File::create(api_path.to_owned() + "/" + tag["name"].as_str().unwrap() + "/" + tag["name"].as_str().unwrap() + "Controller.ts")?;
        handlebars.render_to_write("controller", &render_data, &mut output_controller)?;      
        
        // parameters
        handlebars.register_template_file("parameters", template_path.to_owned() + "parameters.hbs")?;
        fs::create_dir_all(api_path.to_owned() + "/" + tag["name"].as_str().unwrap() )?;
        let mut output_parameters = File::create(api_path.to_owned() + "/" + tag["name"].as_str().unwrap() + "/" + tag["name"].as_str().unwrap() + "Parameters.ts")?;
        handlebars.render_to_write("parameters", &render_data, &mut output_parameters)?;   
        
        // model
        // handlebars.register_template_file("model", template_path.to_owned() + "model.hbs")?;
        // let mut output_model = File::create(model_path.to_owned() + "/" + tag["name"].as_str().unwrap() + "Model.ts")?;
        // handlebars.render_to_write("model", &render_data, &mut output_model)?;         
    }

    handlebars.register_template_file("dbSchemas", template_path.to_owned() + "dbSchemas.hbs")?;
    // fs::create_dir_all(api_path.to_owned() + "/" + tag["name"].as_str().unwrap() )?;
    let mut output_db = File::create("schema.prisma")?;
    handlebars.render_to_write("dbSchemas", &make_schema_data(&swagger_yaml), &mut output_db)?;

    
    // &tag["name"].as_str().unwrap() +

    // make data and render it
    // let data = make_data(swagger_yaml);
    
    // handlebars.register_template_file("controller", "./src/templates/controller.hbs")?;
    // let mut output_controller = File::create("target/controller.ts")?;
    // handlebars.render_to_write("controller", &data, &mut output_controller)?;

    Ok(())
}