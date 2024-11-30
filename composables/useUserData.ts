export interface Skill {
  name: string;
  level: number;
}

export interface UserData {
  name: string;
  avatar: string;
  contact: string[];
  status: string;
  skills: Skill[];
  hobbies: string[];
  bio: string;
  questions: Question[];
  projects: Project[];
  projectsVisited: number[];
  questionsVisited: number[];
}

interface UserDataWithId {
  id: number;
  avatar: string;
  contact: string[];
  name: string;
  status: string;
  skills: Skill[];
  hobbies: string[];
  bio: string;
  questions: Question[];
  projects: Project[];
  projectsVisited: number[];
  questionsVisited: number[];
}
export interface UserDataShort {
  id: number;
  avatar: string;
  name: string;
  skills: string[];
}

export interface ProjectsUserCanHelpWith {
  id: number;
  title: string;
  skills: string[];
}

export interface QuestionsUserCanHelpWith {
  id: number;
  title: string;
  skills: string[];
}

export const useUserData = () => {
  const userData = useState<UserData>("userData", () => ({
    name: "",
    avatar: "profile-mr-light.png",
    contact: [],
    status: "",
    skills: [],
    hobbies: [],
    bio: "",
    questions: [],
    projects: [],
    projectsVisited: [],
    questionsVisited: [],
  }));
  const profileData = useState<UserData>("profileData", () => ({
    name: "",
    avatar: "profile-mr-light.png",
    contact: [],
    status: "",
    skills: [],
    hobbies: [],
    bio: "",
    questions: [],
    projects: [],
    projectsVisited: [],
    questionsVisited: [],
  }));
  const emptyUser = {
    name: "",
    avatar: "profile-mr-light.png",
    contact: [],
    status: "",
    skills: [],
    hobbies: [],
    bio: "",
    questions: [],
    projects: [],
    projectsVisited: [],
    questionsVisited: [],
  };
  const allHobbies = useState<string[]>("allHobbies", () => []);
  const projectsUserCanHelpWith = useState<ProjectsUserCanHelpWith[]>(
    "projectsUserCanHelpWith",
    () => []
  );
  const questionsUserCanHelpWith = useState<QuestionsUserCanHelpWith[]>(
    "questionsUserCanHelpWith",
    () => []
  );
  const { userId } = useAuth();
  const { projectsList, updateProjectsList } = useProjectsData();
  const { questionsList, updateQuestionsList } = useQuestionData();

  // fetch own user data and store it into userData
  const fetchUserData = async (id = userId.value) => {
    try {
      // send request to api/data
      const dataRequest = await $fetch("/api/getUserData", {
        method: "POST",
        body: {
          id: id,
        },
      });
      if (dataRequest.success && dataRequest.result) {
        userData.value = JSON.parse(dataRequest.result.data);
      } else {
        throw createError({
          statusCode: 500,
          statusMessage:
            "There's a fracture in the Weave. Roll Arcana to investigate.",
        });
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  // fetch currently viewed profile's user data and store it into profileData
  const fetchProfileData = async (id = userId.value) => {
    try {
      // send request to api/data
      const dataRequest = await $fetch("/api/getUserData", {
        method: "POST",
        body: {
          id: id,
        },
      });
      if (dataRequest.success && dataRequest.result) {
        profileData.value = JSON.parse(dataRequest.result.data);
      } else {
        throw createError({
          statusCode: 500,
          statusMessage:
            "There's a fracture in the Weave. Roll Arcana to investigate.",
        });
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const clearData = () => {
    userData.value = emptyUser;
    profileData.value = emptyUser;
  }

  const updateUserData = async (id = userId.value, data: Object) => {
    const dataString = JSON.stringify(data);

    try {
      // send credentials to api/auth
      const dataRequest = await $fetch("/api/updateUserData", {
        method: "POST",
        body: {
          id: id,
          data: dataString,
        },
      });
      if (dataRequest.success && dataRequest.result) {
        userData.value = JSON.parse(dataRequest.result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetch userData & return name from the JSON
  const getName = (id = userId.value) => {
    fetchUserData(id).then(() => {
      return userData.value.name;
    });
  };

  // fetch userData & return avatar from the JSON
  const getAvatar = (id = userId.value) => {
    fetchUserData(id).then(() => {
      return userData.value.avatar;
    });
  };

  const fetchAllData = async () => {
    try {
      // send request to api/data
      const dataRequest = await $fetch("/api/getAllUserData", {
        method: "POST",
        body: {},
      });
      if (dataRequest.success && dataRequest.result) {
        return dataRequest.result;
      } else {
        throw createError({
          statusCode: 500,
          statusMessage:
            "There's a fracture in the Weave. Roll Arcana to investigate.",
        });
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const getHobbies = async () => {
    const data = await fetchAllData();
    data?.forEach((item: UserDataWithId) => {
      item.hobbies.forEach((hobby: string) => {
        if (!allHobbies.value.includes(hobby)) {
          allHobbies.value.push(hobby);
        }
      });
    });
  };

  // find projects from all projects with matching required skills
  const findProjectsUserCanHelpWith = async () => {
    updateProjectsList();
    projectsUserCanHelpWith.value = [];

    projectsList.value.forEach((p) => {
      const matches = p.requiredSkills.filter((item) =>
        userData.value.skills.map((s) => s.name).includes(item)
      );

      if (
        matches.length > 0 &&
        p.isLookingForMembers &&
        userId.value !== p.owner
      ) {
        projectsUserCanHelpWith.value.push({
          id: p.id,
          title: p.title,
          skills: matches,
        });
      }
    });
  };

  // find projects from all projects with matching required skills
  const findQuetionsUserCanHelpWith = async () => {
    updateQuestionsList();
    questionsUserCanHelpWith.value = [];

    questionsList.value.forEach((q) => {
      const matches = q.requiredSkills.filter((item) =>
        userData.value.skills.map((s) => s.name).includes(item)
      );

      if (matches.length > 0 && userId.value !== q.owner) {
        questionsUserCanHelpWith.value.push({
          id: q.id,
          title: q.title,
          skills: matches,
        });
      }
    });
  };

  const addVisitedProject = async (id: number) => {
    if (!userData.value.projectsVisited.includes(id)) {
      userData.value.projectsVisited.push(id);
    }
    updateUserData(userId.value, userData.value);
  };

  const addVisitedQuestion = async (id: number) => {
    if (!userData.value.questionsVisited.includes(id)) {
      userData.value.questionsVisited.push(id);
    }
    updateUserData(userId.value, userData.value);
  };

  return {
    getName,
    getAvatar,
    updateUserData,
    fetchUserData,
    userData,
    getHobbies,
    allHobbies,
    findProjectsUserCanHelpWith,
    projectsUserCanHelpWith,
    findQuetionsUserCanHelpWith,
    questionsUserCanHelpWith,
    addVisitedProject,
    addVisitedQuestion,
    fetchProfileData,
    profileData,
    clearData
  };
};
