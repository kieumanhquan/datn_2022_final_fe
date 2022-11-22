export interface JobDto{
  updateDate: Date;
  updateUserId: number;
  id: number;
  name: string;
  jobPositionId: number;
  numberExperience: number;
  addressWork: string;
  academicLevelId: number;
  workingFormId: number;
  rankId: number;
  qtyPerson: number;
  createDate?: Date;
  dueDate: Date;
  skills: string;
  startRecruitmentDate?: Date;
  description: string;
  benefits: string;
  salaryMax: number;
  salaryMin: number;
  contactId: number;
  statusJobId: number;
  jobRequirement: string;
  views: number;
  creatorId: number;
  delete?: boolean;
}
