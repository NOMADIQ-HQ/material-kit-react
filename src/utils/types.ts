export type BuildingType = {
  _id: string;
  name: string;
};

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  leaseStartDate: string; // ISO string format (Date)
  leaseEndDate: string; // ISO string format (Date)
  buildingID: BuildingType; // Updated to reflect the object structure for buildingID
  isDeleted: boolean;
  createdAt: string; // ISO string format (Date)
  updatedAt: string; // ISO string format (Date)
  __v: number;
  status: 'active' | 'inactive'; // You can specify more possible status values if necessary
  userRole: 'admin' | 'user'; // Modify roles as necessary
  password: string; // Assuming this is stored as plain text (you might want to hash it in real scenarios)
};
