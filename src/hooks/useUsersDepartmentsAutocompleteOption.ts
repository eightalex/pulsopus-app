// import { sortBy } from "lodash";
// import { useCallback, useMemo } from "react";
// import { IAutocompleteOption } from "@/components/Autocomplete";
// import { generateAutocompleteOption } from "@/helpers/generateAutocompleteOption.ts";
// import { useSelector } from "@/hooks";
// import { IDepartment } from "@/interfaces/IDepartment.ts";
// import { IUser } from '@/interfaces/IUser.ts';
// import { selectDepartments } from "@/stores_new/departments";
// import { selectUsers } from "@/stores_new/users";
//
// export const useUsersDepartmentsAutocompleteOption = () => {
//     const users = useSelector(selectUsers);
//     const departments = useSelector(selectDepartments);
//
//     const userOptions = useMemo(
//         (): IAutocompleteOption[] =>
//             generateAutocompleteOption<IUser>(users, {
//                 type: 'user',
//                 keys: {
//                     label: 'username',
//                     value: 'id',
//                 }
//             }),
//         [users]);
//
//
//     const departmentOptions = useMemo(
//         (): IAutocompleteOption[] =>
//             generateAutocompleteOption<IDepartment>(departments, {
//                 type: 'department',
//                 keys: {
//                     label: 'name',
//                     value: 'id',
//                 }
//             }),
//         [departments]);
//
//     const options = useMemo(
//         () => sortBy(
//             [...userOptions, ...departmentOptions], ['type', 'label']
//         ).sort((p, n) => {
//             if(p.type !== 'department' || n.type !== 'department') return 0;
//             if(p.label.toLowerCase() === 'company') return -1;
//             if(n.label.toLowerCase() === 'company') return 1;
//             return 0;
//         }),
//         [userOptions, departmentOptions]);
//
//     const getItemByOption = useCallback((option?: IAutocompleteOption): IUser | IDepartment | undefined => {
//         if(!option) return undefined;
//         const finded = option.type === 'user' ? users : departments;
//         return finded.find(({ id }) => id === option.value) || undefined;
//     }, [departments, users]);
//
//     const getOptionByItem = useCallback((item?: IUser | IDepartment) => {
//         return options.find(({ value }) => value === item?.id) || undefined;
//     }, [options]);
//
//     return {
//         options,
//         getItem: getItemByOption,
//         getOption: getOptionByItem,
//     };
// };