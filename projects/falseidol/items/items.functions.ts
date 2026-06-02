import Item, { ItemAttributes } from './items.model'

export const getItems = async () => {
    const items = await Item.findAll({
        where: {} 
    });

    return items;
}

export const getItemById = async (itemId: string) => {
    const item = await Item.findByPk(itemId);

    if (!item) throw new Error('Item not found');
 
    return item;
}

export const createItem = async (data: ItemAttributes) => {
    const item = await Item.create(data);

    return item;
}

export const updateItem = async (data: ItemAttributes, itemId: string) => {
    const item = await Item.findByPk(itemId);

    if (!item) throw new Error('Item not found');

    await item.update(data);
    
    return item;
}

export const deleteItem = async (itemId: string) => {
    const item = await Item.findByPk(itemId);

    if (!item) throw new Error('Item not found');

    await item.destroy();

    return item;
}
