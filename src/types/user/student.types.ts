export interface TStudent {
	_id?: string
	id?: string; // embedded from user's custom id
	userId?: string; // reference id to User Collection
	name: {
		firstName: string;
		middleName: string;
		lastName: string;
	};
	gender: 'female' | 'male';
	dateOfBirth: Date|string;
	email: string;
	contactNo: string;
	bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O-' | 'O+';
	emergencyContactNo: string[];
	presentAddress: string;
	permanentAddress: string;
	guardians: TGuardian;
	profileImage?: string;
	admissionSemester: string;
	academicDepartment: string;
	academicFaculty?: string;
}

type TGuardian = {
	fatherName: string;
	fatherOccupation: string;
	fatherContactNo: string;
	motherName: string;
	motherOccupation: string;
	motherContactNo: string;
};