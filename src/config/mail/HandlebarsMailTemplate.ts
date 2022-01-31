import handlebars from 'handlebars';
import fs from 'fs';
export interface IVariables {
    [key: string]: string | number;
}

export interface ITemplate {
    file: string;
    variables: IVariables;
}

export default class handleBarsMailTemplate {
    public async parse({ file, variables }: ITemplate): Promise<string> {
        const templateReader = await fs.promises.readFile(file, {encoding: 'utf-8'})

        const parsedTemplate = handlebars.compile(templateReader);

        return parsedTemplate(variables);
    }
}
