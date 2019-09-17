type Facility = {
  facId: string;
  facilityName: string;
};

type Patient = {
  patientId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  admissionDate: string;
};

type Address = {
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  country: string;
  county: string;
  postalCode: string;
  state: string;
};

type CalendarEvent = {
  calendarEventId: number;
  description: string;
  endDateTime: string;
  occurrenceId: number;
  startDateTime: string;
};

type Race = {
  raceDesc: string;
};

type DesiredBooking = {
  dateRequested: string;
  desiredMoveDate: string;
  desiredLocation: string;
};

type PatientContact = {
  contactId: number;
  addressLine1: string;
  city: string;
  country: string;
  county: string;
  postalCode: string;
  state: string;
  cellPhone?: string;
  homePhone?: string;
  namePrefix?: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  relationship: string;
};

type Client = {
  admissionDate?: string;
  bedDesc?: string;
  bedId?: number;
  birthDate?: string;
  citizenship?: string;
  deathDateTime?: string,
  deceased: boolean;
  desiredBooking?: DesiredBooking,
  dischargeDate?: string,
  email?: string,
  ethnicityDesc?: string,
  events?: Array<CalendarEvent>;
  facId: number;
  firstName?: string;
  floorDesc?: string;
  floorId?: number;
  gender?: string;
  hasPhoto?: boolean;
  homePhone?: string;
  isOnLeave?: boolean;
  languageCode?: string;
  languageDesc?: string;
  lastName?: string;
  maritalStatus?: string;
  medicaidNumber?: string;
  medicalRecordNumber?: string;
  medicareBeneficiaryIdentifier?: string,
  medicareNumber?: string;
  middleName?: string,
  orgId: number;
  orgUuid: string;
  outpatient: boolean;
  patientContacts?: Array<PatientContact>;
  patientExternalId: string;
  patientId: number;
  patientRaces?: Array<Race>;
  patientStatus: string;
  preferredName?: string,
  prefix?: string,
  previousAddress?: Address;
  religion?: string;
  roomDesc?: string;
  roomId?: number;
  specialInstructions?: string,
  smokingStatusCode?: string;
  smokingStatusDesc?: string;
  socialBeneficiaryIdentifier?: string;
  suffix?: string;
  unitDesc?: string;
  unitId?: number;
  waitingList: boolean;
};
