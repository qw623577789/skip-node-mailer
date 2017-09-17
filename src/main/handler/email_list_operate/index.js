import {Menu, MenuItem} from 'electron'

export default async (request)=>{
    switch(request) {
        case "showEmailBlockMenu":
        showEmailBlockMenu()
            break;;
        default :
            throw new Error(`can not deal the request ${request}`);
    }
}

function showEmailBlockMenu(){
    let menu = new Menu();
    menu.append(new MenuItem({ label: '全选' }));
    menu.append(new MenuItem({ label: '删除' }));
    menu.append(new MenuItem({ type: 'separator' }))
    menu.append(new MenuItem({ label: '标记为已读' }));
    menu.append(new MenuItem({ type: 'separator' }))
    menu.append(new MenuItem({ label: '回复' }));
    menu.append(new MenuItem({ label: '转发' }));
    menu.popup(mainWindow);
}