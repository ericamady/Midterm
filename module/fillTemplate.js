
// this is a module
export function fillTemplate(template, item){
    let output = template.replace(/\{\{ID}\}/g,item.id);
    output = output.replace(/\{\{NAME}\}/g,item.name);
    output = output.replace(/\{\{IMAGE}\}/g,item.image);
    output = output.replace(/\{\{CATEGORY}\}/g,item.category);
    output = output.replace(/\{\{PRICE}\}/g,item.price.toFixed(2));
   

    return output;
};  