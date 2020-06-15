<h1 align="center">
<br>
  <img src="https://github.com/Marcelo8173/FindPet/blob/master/tmp/Grupo%20371.svg" alt="FindPet" width="250">
<br>
<br>
FindPet - Back-end (under construction)
</h1>

<p align="center">FindPet is an app that brings people closer to adopting a pet</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
</p>

<hr />

## Features
[//]: # (Add the features of your project here:)
This app features all the latest tools and practices in web back-end development

- **Node Js**  — A JavaScript library for building API Rest
- **Docker - Postgres**

## Getting started

- Clone this repository
- Use yarn or npm init to install dependencies

- This project use container's docker to database. If you haven't installed it, just follow the tutorial at `https://www.docker.com/`
- Use `docker run --name findpet_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres` to up the contairner with postgress.

- If you already have other docker containers, you will need to redirect the ports.

## Routes

- `POST - localhost:3333/sessions` - to start a session. You need an email and password already registered <br/><br/>
  `{ `<br/>`
    "email": ,`<br/>`
    "password": `<br/>`
    }`
 
- `POST - localhost:3333/users/create` - to create a new user <br/><br/>
  `{ `<br/>`
    "name": ,`<br/>`
    "email": ,`<br/>`
    "password": `<br/>`
    }`
    
- `PUT - localhost:3333/profile/update` - to update profile. Password is optional <br/><br/>
    `{ `<br/>`
    "name": ,`<br/>`
    "email": ,`<br/>`
    "password"?: `<br/>`
    }`
   
- `DELETE - localhost:3333/profile/delete` - to delete a profile
    
- `PATCH -   localhost:3333/users/avatar` - to update avatar <br/><br/>
  `Multipart `<br/>`
  avatar: ` 

<div align="center">
<img  src="https://github.com/Marcelo8173/FindPet/blob/master/tmp/Grupo%20236.png" alt="FindPet" width="180">
<div/>

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) page for details.
