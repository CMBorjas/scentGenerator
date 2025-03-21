use rand::prelude::*; // Add this to bring `SliceRandom` into scope
use std::io;
use std::fs::read_to_string;

fn load_scents(filename: &str) -> Vec<String> {
    match read_to_string(filename) {
        Ok(contents) => contents
            .lines()
            .map(|line| line.trim().to_string())
            .filter(|line| !line.is_empty())
            .collect(),
        Err(_) => {
            println!("Failed to read file '{}'", filename);
            vec![]
        }
    }
}

fn main(){
    let plesant_scents = load_scents("pleasant.txt");
    let pungeant_scents = load_scents("pungent.txt");

    if plesant_scents.is_empty() || pungeant_scents.is_empty() {
        println!
        ("Make sure 'pleasant.txt' and 'pungent.txt' exist in the current directory & have scents in them.");
        return;
    }

    let mut rng = rand::rng();
    println!("Press enter to generate a scent combo, or type 'exit' or 'q' to quit.");
    loop {
        let mut input = String::new();
        io::stdin().read_line(&mut input).expect("Failed to read line");
        
        if input.trim() == "exit" {
            break;
        }
        else if input.trim() =="q" {
            break;
        }
        else{
            let pleasant_scent = plesant_scents.choose(&mut rng).unwrap();
            let pungent_scent = pungeant_scents.choose(&mut rng).unwrap();
        
            println!("{} and {}", pleasant_scent, pungent_scent);
        }
    }
}