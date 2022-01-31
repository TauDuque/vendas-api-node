import handlebars from 'handlebars';

export interface IVariables {
    [key: string]: string | number;
}

export interface ITemplate {
    template: string;
    variables: IVariables;
}

export default class handleBarsMailTemplate {
    public async parse({ template, variables }: ITemplate): Promise<string> {
        const parsedTemplate = handlebars.compile(template);

        return parsedTemplate(variables);
    }
}
