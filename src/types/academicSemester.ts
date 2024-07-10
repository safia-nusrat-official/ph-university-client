export type TMonth =
	| 'January'
	| 'February'
	| 'March'
	| 'April'
	| 'May'
	| 'June'
	| 'July'
	| 'August'
	| 'September'
	| 'October'
	| 'November'
	| 'December';

export type TSemesterNames = 'Autumn' | 'Summer' | 'Spring';
export type TSemesterCodes = '01' | '02' | '03';
export interface TAcademicSemester {
	name: TSemesterNames;
	year: string;
	code: TSemesterCodes;
	startMonth: TMonth;
	endMonth: TMonth;
}
