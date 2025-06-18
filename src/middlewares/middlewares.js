import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET;
const middlewares = {
  global: (req, res, next) => {
    const body = req.ip;
    console.log(body);
    next();
  },
  idValidate: (req, res, next) => {
    const id = req.params.id;
    if (id.length != 2) {
      return res
        .status(400)
        .json({ error: "o id possui 2 caracteres obrigatoriamente" });
    }
    next();
  },
  verifyToken: (req, res, next) => {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader ? tokenHeader.split(" ")[1] || tokenHeader: null;
    
    if (!token) {
      return res.status(401).json({
        ok: false,
        status: 401,
        message: "Acesso não autorizado",
      });
    }
    try {
      const dados = jwt.verify(token, SECRET);
      req.user = dados
      next();
    } catch (error) {
      return res.status(401).json({
        ok: false,
        status: 401,
        message: "Token não válido",
      });
    }
  },
  verifyTokenAdmin: (req, res, next) => {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader.split(" ")[1] || tokenHeader;
    if (!token) {
      return res.status(401).json({
        ok: false,
        status: 401,
        message: "Acesso não autorizado",
      });
    }
    try {
      const data = jwt.verify(token, SECRET);
      req.user = data;
      if (data.acesso != "admin") {
        return res.status(401).json({
          ok: false,
          status: 401,
          message: "Acesso não autorizado",
        });
      }
      next();
    } catch (error) {
      return res.status(401).json({
        ok: false,
        status: 401,
        message: "Token não válido",
      });
    }
  },
};

export default middlewares;
