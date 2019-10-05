export class AppSettings {
  public static languages = ['en', 'fr'];
  public static coordinatePattern = '([-+]?[0-9]*\.?[0-9]*)';
  public static imgUrlPattern = '(https?://.*.(?:png|jpg|jpeg|gif|svg))';
  public static urlPattern = /https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9\.]{1,6}\/([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm;
}
