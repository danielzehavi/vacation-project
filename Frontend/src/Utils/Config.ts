class Config {
  public registerUrl = "";
  public loginUrl = "";
  public vacationsUrl = "";
  public vacationsByFollowersUrl = "";
}

class DevelopmentConfig extends Config {
  public registerUrl = "http://localhost:3001/api/auth/register/";
  public loginUrl = "http://localhost:3001/api/auth/login/";
  public vacationsUrl = "http://localhost:3001/api/vacations/";
  public vacationsByFollowersUrl =
    "http://localhost:3001/api/vacations-by-followers/";
}

class ProductionConfig extends Config {
  public registerUrl = "http://localhost:3001/api/auth/register/";
  public loginUrl = "http://localhost:3001/api/auth/login/";
  public vacationsUrl = "http://localhost:3001/api/vacations/";
  public vacationsByFollowersUrl =
    "http://localhost:3001/api/vacations-by-followers/";
}

const config =
  process.env.NODE_ENV === "development"
    ? new DevelopmentConfig()
    : new ProductionConfig();

export default config;
