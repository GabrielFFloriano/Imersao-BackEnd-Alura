import express from "express";

const posts = [
    {
        id: 1,
        descricao: "Foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Meu gato fazendo cara de paisagem",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 3,
        descricao: "Gato curioso explorando a caixa",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 4,
        descricao: "Gatinho dormindo no sol",
      imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 5,
        descricao: "Gato brincando com um novelo de lã",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 6,
        descricao: "Olha que gatinho mais fofo!",
        imagem: "https://placecats.com/millie/300/150"
    }
];

const app = express(); // app = servidor

app.use(express.json()); // parseia para json
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// rotas
app.get("/posts", (req,res) => {
    res.status(200).json(posts);
});

function buscarPostPorId(id){
    return posts.findIndex((post) => {
        return post.id === Number(id)
    });
};

app.get("/posts/:id", (req,res) => {
    const index = buscarPostPorId(req.params.id)
    res.status(200).json(posts[index]);
});