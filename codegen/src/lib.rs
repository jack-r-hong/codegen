extern crate env_logger;
extern crate handlebars;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;


use std::error::Error;
use inflector::cases::pascalcase::to_pascal_case;
use inflector::cases::snakecase::{is_snake_case, to_snake_case};
use inflector::cases::camelcase::{ to_camel_case};

use serde_json::value::{Map, Value as Json};
use std::collections::HashMap;

use handlebars::{
    to_json, Context, Decorator, Handlebars, Helper, JsonRender, Output, RenderContext, RenderError,
};

pub fn each_parameter_helper(
    h: &Helper,
    _: &Handlebars,
    _: &Context,
    _: &mut RenderContext,
    out: &mut dyn Output,    
)-> Result<(), RenderError> {
    // get parameter from helper or throw an error
    // println!("ssssssss");
    // println!("{:?}", ha);
    let parameter = h
        .param(0)
        .ok_or(RenderError::new("Param 0 is required for parameter helper."))?;
    // let data_type = h
    //     .param(1)
    //     .ok_or(RenderError::new("Param 1 is required for parameter helper."))?;
    // let rendered = to_pascal_case(parameter.value().as_str().unwrap());
    print!("{:?}",parameter.value().as_array().unwrap());
    let rendered = to_pascal_case("ssss");
    out.write(rendered.as_ref())?;
    Ok(())
}

pub fn path_parameter_helper(
    h: &Helper,
    _: &Handlebars,
    _: &Context,
    _: &mut RenderContext,
    out: &mut dyn Output,    
)-> Result<(), RenderError> {
    let path = h
        .param(0)
        .ok_or(RenderError::new("Param 0 is required for parameter helper."))?;
    let rendered: String = path.value()
        .render()
        .chars()
        .map(|c| {
            match c{
                '{' => ':',
                '}' => ' ',
                _ => c
            }
        })
        .collect();
    
    out.write(&rendered.trim())?;
    Ok(())
}

pub fn format_helper(
    h: &Helper,
    _: &Handlebars,
    _: &Context,
    _: &mut RenderContext,
    out: &mut dyn Output,
) -> Result<(), RenderError> {
    // get parameter from helper or throw an error
    let param = h
        .param(0)
        .ok_or(RenderError::new("Param 0 is required for format helper."))?;
    let rendered =  format!("{} pts", param.value().render());
    out.write(rendered.as_ref())?;
    Ok(())
}

fn type_convert<'a>(t:  &'a str, mode:  &'a str, format:  &'a str ) ->  &'a str{
    let res = match t {
        "string" if format == "date-time" => "DateTime",
        "string" if mode == "schema" => "String",
        "string" => "string",
        "integer" if mode == "schema" => "Int",
        "integer" => "number",
        "array" => "String",
        // Some(x) => x,
        _ =>  ""
    };

    res
}

pub fn parameter_type_helper(
    h: &Helper,
    _: &Handlebars,
    _: &Context,
    _: &mut RenderContext,
    out: &mut dyn Output,    
)-> Result<(), RenderError> {
    let parameters = h
        .param(0)
        .ok_or(RenderError::new("Param 0 is required for parameter helper."))?;
    let p2 = h
        .param(1)
        .ok_or(RenderError::new("Param 1 is required for parameter helper."));
    let p3 = h
        .param(2)
        .ok_or(RenderError::new("Param 2 is required for parameter helper."));        
    
    let mode = match p2{
        Ok(x) => x.value().as_str().unwrap(),
        _ => "" 
    };   
    
    let format = match p3{
        Ok(x) => {
            if let Some(y) =  x.value().as_str() {y}
            else {""}
        },
        _ => "" 
    };  

    let rendered = type_convert(parameters.value().as_str().unwrap(), mode, format);

    out.write(&rendered)?;
    Ok(())
}

pub fn is_int_helper(
    h: &Helper,
    _: &Handlebars,
    _: &Context,
    _: &mut RenderContext,
    out: &mut dyn Output,    
)-> Result<(), RenderError> {
    let parameter = h
        .param(0)
        .ok_or(RenderError::new("Param 0 is required for parameter helper."))?;
    let rendered = match parameter.value().as_str().unwrap() {
        "Integer" => "true",
        _ => ""
    };

    out.write(&rendered)?;
    Ok(())
}


pub fn format_pascal_case_helper(
    h: &Helper,
    _: &Handlebars,
    _: &Context,
    _: &mut RenderContext,
    out: &mut dyn Output,    
)-> Result<(), RenderError> {
    // get parameter from helper or throw an error
    let param = h
        .param(0)
        .ok_or(RenderError::new("Param 0 is required for format pascal case helper."))?;
    let rendered = to_pascal_case(param.value().as_str().unwrap_or("error"));
    out.write(rendered.as_ref())?;
    Ok(())
}

pub fn format_camel_case_helper(
    h: &Helper,
    _: &Handlebars,
    _: &Context,
    _: &mut RenderContext,
    out: &mut dyn Output,    
)-> Result<(), RenderError> {
    // get parameter from helper or throw an error
    let param = h
        .param(0)
        .ok_or(RenderError::new("Param 0 is required for format pascal case helper."))?;
    let rendered = to_camel_case(param.value().as_str().unwrap_or("error"));
    out.write(rendered.as_ref())?;
    Ok(())
}

pub fn format_snake_case_helper(
    h: &Helper,
    _: &Handlebars,
    _: &Context,
    _: &mut RenderContext,
    out: &mut dyn Output,    
)-> Result<(), RenderError> {
    // get parameter from helper or throw an error
    let param = h
        .param(0)
        .ok_or(RenderError::new("Param 0 is required for format pascal case helper."))?;
    let rendered = to_snake_case(param.value().as_str().unwrap_or("error"));
    out.write(rendered.as_ref())?;
    Ok(())
}



pub fn id_default_helper(
    h: &Helper,
    _: &Handlebars,
    _: &Context,
    _: &mut RenderContext,
    out: &mut dyn Output,    
)-> Result<(), RenderError> {
    // get parameter from helper or throw an error
    let param = h
        .param(0)
        .ok_or(RenderError::new("Param 0 is required for format pascal case helper."))?;
    
    
    let rendered =   if param.value().as_str().unwrap_or("error") == "id" {
        "@id @default(autoincrement())"
    }else{
        ""
    };
    out.write(rendered.as_ref())?;
    Ok(())
}

pub fn ref_helper(
    h: &Helper,
    _: &Handlebars,
    context: &Context,
    _: &mut RenderContext,
    out: &mut dyn Output,    
)-> Result<(), RenderError> {
    // get parameter from helper or throw an error
    let param = h
        .param(0)
        .ok_or(RenderError::new("Param 0 is required for format pascal case helper."))?;

    let rendered = if let Some(x) = param.value().as_str() {
        x.strip_prefix("#/components/schemas/").unwrap()
    } else {
        ""
    };    
    
    out.write(rendered.as_ref())?;
    Ok(())
}

pub fn foreign_key_helper(
    h: &Helper,
    _: &Handlebars,
    ctx: &Context,
    _: &mut RenderContext,
    out: &mut dyn Output,    
)-> Result<(), RenderError> {
    // get parameter from helper or throw an error
    let param = h
        .param(0)
        .ok_or(RenderError::new("Param 0 is required for format pascal case helper."))?;

    let mut data = vec!();
    let mut map = Map::new();

    for (schema, v) in ctx.data()["schemas"].as_object().unwrap() {
        for (k2, v2) in v["properties"].as_object().unwrap(){
            for (k3, v3) in v2.as_object().unwrap(){
                if k3.as_str() == "$ref"{
                    // println!("v2 {:?}", v2["type"]);
                    // println!("v3: {:?}", v3.as_str().unwrap() );
                    // println!("k2: {:?}", k2);
                    let vec: Vec<&str> = v3.as_str().unwrap().split('/').collect();
                    // vec[3]: table name, k2: FOREIGN KEY,  vec[5]: REFERENCES FIELD

                    if vec.len() > 4 {
                        map.insert(
                            vec[3].to_string(),
                            to_json([
                                vec[3], 
                                k2, 
                                vec[5],
                                v2["type"].as_str().unwrap(),
                                schema.as_str()
                            ])
                        );                        
                    }


                    
                    // if v3.as_str().unwrap().contains(param.value().as_str().unwrap()){
                    //     let row =  to_camel_case(schema.as_str()).to_owned() + " " + schema.as_str() + "[]";
                    //     data.push(row.to_string());
                    // }
                }

                // if k3.as_str() == "items" {
                //     for (k4, v4) in v3.as_object().unwrap(){
                //         if k4.as_str() == "$ref"{
                //             let row = to_camel_case(schema).to_owned() + " " 
                //             + &to_pascal_case( &(k2.to_owned() + "On" + schema) ) + "[]";
                //             if  v4.as_str()
                //                 .unwrap()
                //                 .contains(param.value().as_str().unwrap())
                //             {
                //                 data.push(row.to_string());
                //             }

                //             if  param.value().as_str()
                //                 .unwrap()
                //                 .contains(schema)
                //             {
                //                 data.push(row.to_string());
                //             }
                //         }
                //     }

                // }                
            }

            
        }
    }

    
    // println!("{:?}", &map);
    for (table, arr) in map {
        if param.value().as_str().unwrap() == arr[4] {
            // println!("{} {} @relation(fields: [{}], references: [{}])", arr[0], arr[0], arr[1], arr[2]);
            // println!("{} {}", arr[1], arr[3]);
            data.push(
                format!(
                    "{} {}? @relation(fields: [{}], references: [{}])", 
                    to_camel_case(arr[0].as_str().unwrap()), 
                    arr[0].as_str().unwrap(), 
                    arr[1].as_str().unwrap(), 
                    arr[2].as_str().unwrap()
                )
            );
            data.push(
                format!(
                    "{} {} @map(\"{}\")", 
                    arr[1].as_str().unwrap(), 
                    type_convert(arr[3].as_str().unwrap(), "schema", ""),
                    to_snake_case(arr[1].as_str().unwrap()), 
                )
            );
        } 
        if param.value().as_str().unwrap() == arr[0]{
            // println!("{} {}[]", to_camel_case(arr[4].as_str().unwrap() ), arr[4].as_str().unwrap() );
            data.push(format!("{} {}[]", to_camel_case(arr[4].as_str().unwrap() ), arr[4].as_str().unwrap() ));
        }
    }

    // println!("{:?}", map);
    
    // println!("{:?}", param.value().as_str().unwrap() );
    // println!("{:?}", data);
    
    let rendered:String = data.iter().map(|x| x.to_owned() + "\r\n    ").collect();
    
    out.write(rendered.as_ref())?;

    Ok(())
}

pub fn equal_helper(
    h: &Helper,
    _: &Handlebars,
    ctx: &Context,
    _: &mut RenderContext,
    out: &mut dyn Output,    
)-> Result<(), RenderError> {
    // get parameter from helper or throw an error
    let param1 = h
        .param(0)
        .ok_or(RenderError::new("Param 0 is required for equal_helperr."))?;
    let param2 = h
        .param(1)
        .ok_or(RenderError::new("Param 1 is required for equal_helper."))?;
    // println!("{:?}, {:?}, {:?},",  param1.value().as_str().unwrap(), param2.value().as_str().unwrap(),  param1.value().as_str().unwrap() == param2.value().as_str().unwrap() );
    // println!("{:?}, {:?}, ",  param1.value(), param2.value() );
    // println!("{:?}, ",  h );

    let p1 = if let Some(p) =  param1.value().as_str() {p}else{"error1"};
    let p2 = if let Some(p) =  param2.value().as_str() {p}else{"error2"};

    if p1 == p2{
        out.write("1")?;
    }else{
        out.write("")?;
    }
    

    Ok(())
}

pub fn model_type_helper(
    h: &Helper,
    _: &Handlebars,
    ctx: &Context,
    _: &mut RenderContext,
    out: &mut dyn Output,    
)-> Result<(), RenderError> {
    // get parameter from helper or throw an error
    let param0 = h
        .param(0)
        .ok_or(RenderError::new("Param 0 is required for model_helperr."))?;

    let model_type = match param0.value().as_str().unwrap() {
        operation if operation.starts_with("readOne") => "readOne",
        operation if operation.starts_with("readMany") => "readMany",
        operation if operation.starts_with("updateOne") => "updateOne",
        operation if operation.starts_with("updateMany") => "updateMany",
        operation if operation.starts_with("createOne") => "createOne",
        operation if operation.starts_with("createMany") => "createMany",
        operation if operation.starts_with("deleteOne") => "deleteOne",
        operation if operation.starts_with("deleteMany") => "deleteMany",
        operation if operation.starts_with("uploadOne") => "uploadOne",
        operation if operation.starts_with("uploadMany") => "uploadMany",
        _ => "custom"
    
    };

    out.write(model_type)?;




    Ok(())
}

pub fn model_type_is_array_helper(
    h: &Helper,
    _: &Handlebars,
    ctx: &Context,
    _: &mut RenderContext,
    out: &mut dyn Output,    
)-> Result<(), RenderError> {
    // get parameter from helper or throw an error
    let param0 = h
        .param(0)
        .ok_or(RenderError::new("Param 0 is required for model_helperr."))?;

    let model_type = match param0.value().as_str().unwrap() {
        // operation if operation.starts_with("readMany") => "1",
        operation if operation.starts_with("updateMany") => "1",
        operation if operation.starts_with("createMany") => "1",
        operation if operation.starts_with("deleteMany") => "1",
        _ => ""
    
    };

    out.write(model_type)?;




    Ok(())
}


pub fn get_ref_helper(
    h: &Helper,
    _: &Handlebars,
    ctx: &Context,
    _: &mut RenderContext,
    out: &mut dyn Output,    
)-> Result<(), RenderError> {

    

    Ok(())
}



