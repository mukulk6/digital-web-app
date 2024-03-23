import { CollectionConfig } from "payload/types";

export const Users:CollectionConfig = {
    slug:'users',
    fields:[
        {
            name:'role',
            type:'select',
            options:[
                {label:'Admin',value:'Admin'},
                {label:'User',value:'User'}
            ]

        }
    ]
}