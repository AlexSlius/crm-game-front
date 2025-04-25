import { Auth } from "./auth";
import { User } from "./user";
import { Roles } from "./role";
import { Status } from "./status";
import { City } from "./city";
import { TimeZona } from "./time-zona";
import { Games } from "./game";
import { Team } from "./team";
import { Questions } from "./question";

const auth = new Auth();
const user = new User();
const role = new Roles();
const status = new Status();
const cities = new City();
const timeZona = new TimeZona();
const games = new Games();
const teams = new Team();
const questions = new Questions();

export {
    auth,
    user,
    role,
    status,
    cities,
    timeZona,
    games,
    teams,
    questions
}
