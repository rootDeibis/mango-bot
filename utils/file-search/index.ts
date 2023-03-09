import fs from 'fs';

import path from 'path';


export default function search<T>(dir: string): Promise<T[]> {
    const serachedFiles: T[] = [];
    
    

    return new Promise(async (resolve,reject) => {
        const files = fs.readdirSync(dir);

        for(let name of files) {

        

            const $path = path.resolve(dir, name);
    
    
            if(fs.statSync($path).isDirectory()) {
                serachedFiles.push(...await search<T>($path));
            } else {
               
               const module = await import($path);
    
               serachedFiles.push(<T> module.default);
    
            }
    
        }

        resolve(serachedFiles);
    })
}