import { Request, Response, NextFunction } from 'express'
import * as Item from './items.functions'

export const getItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await Item.getItems();
    res.json(items)
  } catch (err) {
    next(err)
  }
}

export const getItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { itemId } = req.params;
    
    const item = await Item.getItemById(itemId);
    res.json(item)
  } catch (err) {
    next(err)
  }
}

export const createItem = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const item = await Item.createItem(req.body);
    res.json(item)
  } catch (err) {
    next(err)
  }
}

export const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { itemId } = req.params;
    
    const item = await Item.updateItem(req.body, itemId);
    res.json(item)
  } catch (err) {
    next(err)
  }
}

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { itemId } = req.params;
    
    const item = await Item.deleteItem(itemId);
    res.json(item)
  } catch (err) {
    next(err)
  }
}
