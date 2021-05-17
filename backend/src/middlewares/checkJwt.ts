import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = req.headers.authjwtoken as string;
  
  let jwtPayload;
  //Try to validate the token and get data 
  try {
    jwtPayload = <any>jwt.verify(token, jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    if(error.name === 'TokenExpiredError'){
      res.status(401).json({ message: "Su sesión ha Expirado. Por favor regístrese nuevamente." });
      return;
    }
    if(error.name === 'JsonWebTokenError'){ 
      res.status(401).json({ message: "El usuario no esta logeado. Por favor regístrese." });
      return;
    }
    if(error.name === 'NotBeforeError'){ 
      res.status(401).json({ message: "NotBeforeError. Por favor regístrese." });
      return;
    }  
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).json({ message: "El usuario no esta logeado." });
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userCode, username } = jwtPayload;
  const newToken = jwt.sign({ userCode, username }, jwtSecret, { expiresIn: "1h" });
  res.setHeader("authjwtoken", newToken);

  //Call the next middleware or controller
  next();
};
