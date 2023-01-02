import { NextFunction, Request, Response } from "express";

export function authGuard() {
  return function (req:Request, res:Response, next:NextFunction) {
    if (req.session.user) {
      return next();
    }
    return res.redirect('/auth');
  };
}
