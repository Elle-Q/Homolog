import {GetItem} from "../api/item.service";
import {ListItems, TotalSize} from "../api/cat.service";

export async function search_loader(parms: any) {
    let keyword = parms.params.keyword ? parms.params.keyword : 'all';
    let cat = parms.params.cat ? parms.params.cat : 'model';
    const data = (await ListItems(1, keyword, cat));
    const size = (await TotalSize(keyword, cat));
    return {
        data: data,
        size: size
    };
}

export async function item_loader(parms: any) {
    return (await GetItem(parms.params.id));
}