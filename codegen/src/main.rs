
extern crate env_logger;
extern crate handlebars;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;

use std::env;
use std::error::Error;
use std::fs;
use std::fs::File;
use std::fmt;


use serde_json::value::{Map, Value as Json};

use handlebars::{
    to_json, Handlebars,
};
use codegen::*;



static TYPES: &'static str = "serde_json";

#[derive(Deserialize, Debug)]
struct Data {
    data: String,
}

fn swagger_loader() -> Json{
    let path = "./swagger/swagger.json";
    let data = fs::read_to_string(path).expect("Unable to read file");
    let mut res: serde_json::Value = serde_json::from_str(&data).expect("Unable to parse");

    let mut res2 = res.clone();

    find_ref(&mut res2, res.as_object_mut());

    res
}

fn find_ref<'a>( full_profile:  &mut Json ,val: Option<&'a mut Map<String, Json>>) -> () {
    match val{
        Some(x) => {
            for (k, v) in x{

                match v.get("$ref"){
                    Some(y) => {
                        let ref_target = full_profile.pointer(
                            y.as_str().unwrap()
                            .get(1..).unwrap()
                        ).unwrap();   
                        // println!("{:?}", ref_target)   ; 
                        let mut  ref_target_mut = ref_target.clone();
                        ref_target_mut.as_object_mut().unwrap().insert("$ref".to_string(), to_json(y));
                        // println!("{:?}", ref_target_mut.as_object_mut());
                        
                        
                        if let Some(a) =  v.get("unique"){
                            ref_target_mut.as_object_mut().unwrap().insert("unique".to_string(), to_json(a));
                        }

                        *v = to_json(ref_target_mut);       
                    },
                    None => ()
                }
                find_ref(full_profile, v.as_object_mut());
            }
        },
        None => ()
    }    
}

fn get_custom_text(c: &str) -> Map<String, Json>{

    let mut custom_data = Map::new();

    let v: Vec<&str> = c.split("//").collect();
    
    v.iter().for_each(|x| {
        if x.starts_with(" custom begin") {
            let mut contents : Vec<&str> = x.split("\r\n").collect();

            let custom_contents = contents.split_off(1)
                .iter()
                .fold(String::new(), |acc, y| {    
                    if y.trim().len() == 0{
                        acc + y.trim()
                    }else{
                        acc + y + "\r\n"
                    } 
                });
            custom_data.insert(
                contents[0].strip_prefix(" custom begin ").unwrap().to_string(), 
                to_json(&custom_contents) 
            );
        }       
    });
    custom_data    
}

fn write_file(
    handlebars: &mut Handlebars,
    render_data: Map<String, Json>, 
    out_file_path: &str, 
    file_type: &str,
    template_path: &str,
    api_input_data_type: &str,
) -> Result<(), Box<dyn Error>>{
    let mut controller_render_data = render_data.clone();

    handlebars.register_template_file(file_type, template_path.to_owned()+ api_input_data_type + "_" + file_type + ".hbs")?;

    let contents = fs::read_to_string(out_file_path);

    if let Ok(c) = contents{
        controller_render_data.insert("custom".to_string(), to_json(get_custom_text(&c)));  
    }   
    
    let mut output_controller = File::create(out_file_path)?;
    handlebars.render_to_write(file_type, &controller_render_data, &mut output_controller)?;  
    Ok(())   
}

fn main() -> Result<(), Box<dyn Error>> {
    env_logger::init();

    let swagger_data = swagger_loader();

    // create the handlebars registry
    let mut handlebars = Handlebars::new();

    let api_path = "../server/src/apiModules/";
    let model_path = "../server/src/models/";
    let template_type = "typescript-express-server";
    let template_path = format!("./src/templates/{}/", template_type);

    // register template from a file and assign a name to it
    // deal with errors
    
    // register some custom helpers
    handlebars.register_helper("format", Box::new(format_helper));
    
    handlebars.register_helper("camel_case", Box::new(format_camel_case_helper));
    handlebars.register_helper("fpc", Box::new(format_pascal_case_helper));
    handlebars.register_helper("snake_case", Box::new(format_snake_case_helper));

    handlebars.register_helper("each_parameter", Box::new(each_parameter_helper));
    handlebars.register_helper("parameter_type", Box::new(parameter_type_helper));
    handlebars.register_helper("is_int", Box::new(is_int_helper));
   
    handlebars.register_helper("id_default", Box::new(id_default_helper));
    handlebars.register_helper("ref", Box::new(ref_helper));
    handlebars.register_helper("foreign_key", Box::new(foreign_key_helper));
    handlebars.register_helper("equal", Box::new(equal_helper));
    handlebars.register_helper("path_parameter_format", Box::new(path_parameter_helper));
    handlebars.register_helper("get_ref", Box::new(get_ref_helper));
    handlebars.register_helper("model_type", Box::new(model_type_helper));
    handlebars.register_helper("model_type_is_array", Box::new(model_type_is_array_helper));
    handlebars.register_helper("add", Box::new(add_helper));

    for tag in swagger_data["tags"].as_array().unwrap(){

        let mut render_data = Map::new();

        let tag_name = tag["name"].as_str().unwrap();

        render_data.insert("tag".to_string(), to_json(tag_name) );
        render_data.insert("data".to_string(), swagger_data.clone());
 
        fs::create_dir_all(api_path.to_owned() + "/" + tag_name )?;

        let api_input_data_type = "api";

        // controller

        let file_type = "controller";
        let controller_file_path = format!("{}{}/{}.{}.ts", api_path, tag_name, tag_name, file_type);
        write_file(&mut handlebars, render_data.clone(), &controller_file_path, file_type, &template_path, api_input_data_type )?;

        // parameters
        let file_type = "parameters";
        let controller_file_path = format!("{}{}/{}.{}.ts", api_path, tag_name, tag_name, file_type);
        write_file(&mut handlebars, render_data.clone(), &controller_file_path, file_type, &template_path, api_input_data_type )?;
       
        // validator

        let file_type = "validator";
        let controller_file_path = format!("{}{}/{}.{}.ts", api_path, tag_name, tag_name, file_type);
        write_file(&mut handlebars, render_data.clone(), &controller_file_path, file_type, &template_path, api_input_data_type )?;

        //service
        let file_type = "service";
        let controller_file_path = format!("{}{}/{}.{}.ts", api_path, tag_name, tag_name, file_type);
        write_file(&mut handlebars, render_data.clone(), &controller_file_path, file_type, &template_path, api_input_data_type )?;

        // model
        let file_type = "model";
        let controller_file_path = format!("{}{}/{}.{}.ts", api_path, tag_name, tag_name, file_type);
        write_file(&mut handlebars, render_data.clone(), &controller_file_path, file_type, &template_path, api_input_data_type )?;            

    }

    let mut db_schema_data = Map::new();
    db_schema_data.insert("schemas".to_string(), swagger_data["components"]["schemas"].clone() );


    let file_type = "dbSchemas";
    let db_schema_path = "../server/prisma/schema.prisma";
    write_file(&mut handlebars, db_schema_data, &db_schema_path, file_type, &template_path, "db" )?;            

    Ok(())
}