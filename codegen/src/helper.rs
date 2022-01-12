// // extern crate yaml_rust;
// use std::env;
// use std::fs;
use std::fs::File;
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





extern crate env_logger;
extern crate handlebars;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;
use std::error::Error;

use serde_json::value::{Map, Value as Json};

use handlebars::{
    to_json, Context, Decorator, Handlebars, Helper, JsonRender, Output, RenderContext, RenderError,
};

// mod front_of_house {
//     pub mod hosting {
//         pub fn add_to_waitlist() {}
//     }
// }

use crate::front_of_house::hosting::add_to_waitlist;

// pub fn eat_at_restaurant() {
//     add_to_waitlist();
//     add_to_waitlist();
//     add_to_waitlist();
// }

// default format helper
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
    let rendered = format!("{} pts", param.value().render());
    out.write(rendered.as_ref())?;
    Ok(())
}

// a decorator registers helpers
pub fn format_decorator(
    d: &Decorator,
    _: &Handlebars,
    _: &Context,
    rc: &mut RenderContext,
) -> Result<(), RenderError> {
    let suffix = d
        .param(0)
        .map(|v| v.value().render())
        .unwrap_or("".to_owned());
    rc.register_local_helper(
        "format",
        Box::new(
            move |h: &Helper,
                  _: &Handlebars,
                  _: &Context,
                  _: &mut RenderContext,
                  out: &mut dyn Output| {
                // get parameter from helper or throw an error
                let param = h
                    .param(0)
                    .ok_or(RenderError::new("Param 0 is required for format helper."))?;
                let rendered = format!("{} {}", param.value().render(), suffix);
                out.write(rendered.as_ref())?;
                Ok(())
            },
        ),
    );
    Ok(())
}

// a decorator mutates current context data
fn set_decorator(
    d: &Decorator,
    _: &Handlebars,
    ctx: &Context,
    rc: &mut RenderContext,
) -> Result<(), RenderError> {
    // get the input of decorator
    let data_to_set = d.hash();
    // retrieve the json value in current context
    let ctx_data = ctx.data();

    if let Json::Object(m) = ctx_data {
        let mut new_ctx_data = m.clone();

        for (k, v) in data_to_set {
            new_ctx_data.insert(k.to_string(), v.value().clone());
        }

        rc.set_context(Context::wraps(new_ctx_data)?);
        Ok(())
    } else {
        Err(RenderError::new("Cannot extend non-object data"))
    }
}

// another custom helper
fn rank_helper(
    h: &Helper,
    _: &Handlebars,
    _: &Context,
    _: &mut RenderContext,
    out: &mut dyn Output,
) -> Result<(), RenderError> {
    let rank = h
        .param(0)
        .and_then(|v| v.value().as_u64())
        .ok_or(RenderError::new(
            "Param 0 with u64 type is required for rank helper.",
        ))? as usize;
    let total = h
        .param(1)
        .as_ref()
        .and_then(|v| v.value().as_array())
        .map(|arr| arr.len())
        .ok_or(RenderError::new(
            "Param 1 with array type is required for rank helper",
        ))?;
    if rank == 0 {
        out.write("champion")?;
    } else if rank >= total - 2 {
        out.write("relegation")?;
    } else if rank <= 2 {
        out.write("acl")?;
    }
    Ok(())
}

static TYPES: &'static str = "serde_json";

// define some data
#[derive(Serialize)]
pub struct Team {
    name: String,
    pts: u16,
}

// produce some data
pub fn make_data() -> Map<String, Json> {
    let mut data = Map::new();

    data.insert("year".to_string(), to_json("2015"));

    let teams = vec![
        Team {
            name: "Jiangsu Suning".to_string(),
            pts: 43u16,
        },
        Team {
            name: "Shanghai SIPG".to_string(),
            pts: 39u16,
        },
        Team {
            name: "Hebei CFFC".to_string(),
            pts: 27u16,
        },
        Team {
            name: "Guangzhou Evergrand".to_string(),
            pts: 22u16,
        },
        Team {
            name: "Shandong Luneng".to_string(),
            pts: 12u16,
        },
        Team {
            name: "Beijing Guoan".to_string(),
            pts: 7u16,
        },
        Team {
            name: "Hangzhou Greentown".to_string(),
            pts: 7u16,
        },
        Team {
            name: "Shanghai Shenhua".to_string(),
            pts: 4u16,
        },
    ];

    data.insert("teams".to_string(), to_json(&teams));
    data.insert("engine".to_string(), to_json(TYPES));
    data
}