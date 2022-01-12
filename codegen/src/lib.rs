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
                '{' =>':',
                '}' =>' ',
                _ => c
            }
        })
        .collect();
    
    out.write(&rendered)?;
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
    let rendered = match parameters.value().as_str() {
        Some("String") => "string",
        Some("string") => "String",
        Some("Integer") => "number",
        Some("integer") => "Int",
        Some("array") => "String",
        // Some(x) => x,
        _ =>  ""
    };

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

    let rendered = if param.value().as_str().unwrap_or("") == "#/components/schemas/Category"{
        "Category"
    }else{
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

    for (schema, v) in ctx.data()["data"].as_object().unwrap() {
        // println!("{:?}", to_snake_case(param.value().as_str().unwrap()) );
        // println!("{:?}", );
        for (k2, v2) in v.as_object().unwrap(){
            for (k3, v3) in v2.as_object().unwrap(){
                if k3.as_str() == "$ref"{
                    if v3.as_str().unwrap().contains(param.value().as_str().unwrap()){
                        let row =  to_camel_case(schema.as_str()).to_owned() + " " + schema.as_str() + "[]";
                        data.push(row.to_string());
                    }
                }

                if k3.as_str() == "items" {
                    for (k4, v4) in v3.as_object().unwrap(){
                        if k4.as_str() == "$ref"{
                            let row = to_camel_case(schema).to_owned() + " " 
                            + &to_pascal_case( &(k2.to_owned() + "On" + schema) ) + "[]";
                            if  v4.as_str()
                                .unwrap()
                                .contains(param.value().as_str().unwrap())
                            {
                                data.push(row.to_string());
                            }

                            if  param.value().as_str()
                                .unwrap()
                                .contains(schema)
                            {
                                data.push(row.to_string());
                            }
                        }
                    }

                }                
            }
        }
    }
    
    let rendered:String = data.iter().map(|x| x.to_owned() + "\r\n    ").collect();
    
    out.write(rendered.as_ref())?;
    Ok(())
}


