import db from "../../app/lib/db";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET": {
            return await get(req, res)
        }
        case "POST": {
            return await post(req, res)
        }
        case "PUT": {
            return await put(req, res)
        }
        case "DELETE": {
            return await del(req, res)
        }
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

async function get(req, res) {
    const {matricula} = req.query;
    if (matricula) {
        const [rows] = await db.execute("SELECT * FROM alunos WHERE matricula = ?", [matricula]);
        const aluno = rows[0];
        if (!aluno) {
            return res.status(404).json({message: "Aluno não encontrado"});
        }
        return res.status(200).json(aluno);
    } else {
        const [alunos] = await db.execute("SELECT * FROM alunos");
        return res.status(200).json(alunos);
    }
}

async function del(req, res){
    const { matricula } = req.query;
    if (!matricula) {
        return res.status(400).json({ message: "-Matricula é obrigatório" });
    }
    const [result] = await db.execute("DELETE FROM alunos WHERE matricula = ?", [id]);
    if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Aluno não encontrado" });
    }
    return res.status(200).json({ message: "Aluno deletado com sucesso", id});
}

async function put(req, res){
    const { nome, email, matricula } = req.query;
    if (!nome || !email) {
        return res.status(400).json({ message: "Nome e email são obrigatórios" });
    }
    if(!matricula){
        return res.status(400).json({ message: "Matricula é necessário" });
    }
    let result = await db.execute("UPDATE alunos SET nome = ?, email = ? WHERE matricula = ?", [nome, email, matricula]);


    if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Aluno não encontrado" });
    }

    return res.status(200).json({ nome, email });
}

async function post(req, res){
    const { nome, matricula, email, senha } = req.query;
    if (!nome || !email || !matricula || !senha) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }
    try{
        const [result] = await db.execute("INSERT INTO alunos (matricula, nome, email, senha) VALUES (?, ?, ?, ?)", [matricula, nome, email, senha]);
    } catch (e){
        return res.status(409).json({
            error: e.error,
            message: e.message});
    }
    return res.status(201).json({ nome, email, matricula });
}