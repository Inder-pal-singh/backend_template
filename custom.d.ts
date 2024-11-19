// custom.d.ts
declare namespace Express {
  export interface Request {
    user: any;
    files: Express.Multer.File[];
  }
}
