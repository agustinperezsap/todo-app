async function getUser(){
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
    )

    const data = await response.json();

    console.log(data.name);

}

getUser();

async function test() {
    
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/2"
    );

    const data = await response.json();

    console.log("Nombre: ", data.name);
    console.log("Email: ", data.email);

}

test();