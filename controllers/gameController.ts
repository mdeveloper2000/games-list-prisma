import { Request, Response } from "express"
import { prisma } from "../libs/prisma.js"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export class GameController {

    public list = async (req: Request, res: Response) => {
        try {
            const allGames = await prisma.game.findMany()            
            res.render("index", { title: "Home", app: process.env.APP, description: process.env.DESCRIPTION, games: allGames })
        }
        catch(error) {
            console.log(error)
        }
    }

    public create = async (req: Request, res: Response) => {
        res.render("create", { title: "Register", app: process.env.APP, description: process.env.DESCRIPTION } )
    }

    public store = async (req: Request, res: Response) => {
        try {
            const title = req.body.title
            const description = req.body.description
            const year: number = parseInt(req.body.year)
            const multiplayer = req.body.multiplayer
            const platinum = req.body.platinum
            const details = req.body.details
            const game = {
                title, description, year, multiplayer, platinum, details
            }
            const createGame = await prisma.game.create({ data: game })            
            if(createGame) {
                res.send({ errors: 0 })
            }            
        }
        catch(error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === "P2002") {                    
                    res.send({ errors: 1})
                }
            }
        }
        
    }

    public read = async (req: Request, res: Response) => {    
        try {
            const game = await prisma.game.findUnique({
                where: {
                    id: parseInt(req.params.id)
                }
            })        
            if(game === null) {
                res.redirect("/")
            }
            else {
                res.render("edit", { game, title: "Edit", app: process.env.APP, description: process.env.DESCRIPTION })            
            }
        }
        catch(error) {        
            console.log(error)
        }
    }

    public show = async (req: Request, res: Response) => {    
        try {
            const game = await prisma.game.findUnique({
                where: {
                    id: parseInt(req.params.id)
                }
            })        
            if(game === null) {
                res.redirect("/")
            }
            else {
                res.render("show", { game, title: "Show", app: process.env.APP, description: process.env.DESCRIPTION })            
            }
        }
        catch(error) {        
            console.log(error)
        }
    }

    public update = async (req: Request, res: Response) => {        
        try {
            const { id, title, year, multiplayer, platinum, details } = req.body
            const game = await prisma.game.findUnique({
                where: {
                    id: parseInt(id)
                }
            })
            if(!game) {
                res.redirect("/")
            }
            else {
                const gameUpdated = await prisma.game.update({
                    where: {
                        id: parseInt(id)
                    },
                    data: {
                        title: title,
                        year: parseInt(year),
                        multiplayer: multiplayer,
                        platinum: platinum,
                        details: details
                    }
                })
                if(gameUpdated) {
                    res.send({ errors: 0 })
                }
                else {
                    res.send({ errors: 1 })
                }
            }
        }
        catch(error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === "P2002") {
                    res.send({ errors: 1 })
                }
            }
        }
    }

    public search = async (req: Request, res: Response) => {
        try {
            const search = req.params.search
            const orderSelected = req.params.order
            const games = await prisma.game.findMany({
                where: {
                    title: {
                        contains: search
                    }
                },
                orderBy: {
                    [orderSelected]: 'asc'
                }
            })
            if(games.length > 0) {
                res.send({ games })
            }
            else {
                res.send({ games: null})
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    public destroy = async (req: Request, res: Response) => {    
        try {
            await prisma.game.delete({
                where: {
                    id: parseInt(req.params.id)
                }
            })
            .then((data) => {
                res.redirect("/")
            })
        }   
        catch(error){
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === "P2025") {                    
                    res.redirect("/")
                }
            }
        }
    }
    
    public notfound = async (req: Request, res: Response) => {
        res.status(404).render("404", { title: "404", app: process.env.APP, description: process.env.DESCRIPTION })
    }

}