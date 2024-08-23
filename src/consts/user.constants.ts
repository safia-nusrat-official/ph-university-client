import { SelectOptions } from "../types/PHSelect.types"

export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O-', 'O+']
export const bloodGroupOptions:SelectOptions = bloodGroups.map(item=>({label:item, value:item}))