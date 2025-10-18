import { Request, Response } from "express";
import { LoremIpsum } from "lorem-ipsum";

const loremPattern = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const index = (req: Request, res: Response) => {
  res.send("Hello World");
};

const sobre = (req: Request, res: Response) => {
  res.send("Página sobre");
};

const lorem = (req: Request, res: Response) => {
  const paragraphs = loremPattern
    .generateParagraphs(Number(req.params.num))
    .split("\n")
    .map((p) => `<p>${p}</p>`)
    .join("");
  res.send(paragraphs);
};

const hb1 = (req: Request, res: Response) => {
  res.render('main/hb1', {
    mensagem: 'Olá, você está aprendendo Express + HBS!',
  })
}

const hb2 = (req: Request, res: Response) => {
  res.render('main/hb2', {
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework',
  })  
}

const hb3 = (req: Request, res: Response) => {
  const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233},
  ]
  res.render('main/hb3', {profes})
}

const hb4 = (req: Request, res: Response) => {
  const technologies = [
    { name: "Express", type: "Framework", poweredByNodejs: true },
    { name: "Laravel", type: "Framework", poweredByNodejs: false },
    { name: "React", type: "Library", poweredByNodejs: true },
    { name: "Handlebars", type: "Engine View", poweredByNodejs: true },
    { name: "Django", type: "Framework", poweredByNodejs: false },
    { name: "Docker", type: "Virtualization", poweredByNodejs: false },
    { name: "Sequelize", type: "ORM tool", poweredByNodejs: true },
  ];
  res.render("main/hb4", { technologies });
};

const erro = (req: Request, res: Response) => {
  res.status(404).send("Página não encontrada");
};



export default { index, sobre, lorem, hb1, hb2, hb3, hb4, erro };