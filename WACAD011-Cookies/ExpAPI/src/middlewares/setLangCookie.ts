const setLangCookie = (req: any, res: any, next: any) => {
  const name = "lang";

  if (!("lang" in req.cookies)) res.cookie("lang", "pt-BR");
  res.cookie(name, "value", { maxAge: 360000 });
  next();
};

export default setLangCookie;
