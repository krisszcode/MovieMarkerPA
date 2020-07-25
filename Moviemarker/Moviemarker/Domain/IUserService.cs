using Moviemarker.Models;
using System.Collections.Generic;

namespace Moviemarker.Domain
{
    public interface IUserService
    {
        public bool Login(string username, string password);
        public void Register(string username, string password, string usertype);
        public bool IsAdmin(string username);

        public int GetUserByName(string userName);

        public void NewFilm(string title, string rating, string desc);

        List<Movie> GetMovies();
        public string AddMovie(int movieid, int userid);
        public int GetMovieId(string title);
        List<Movie> GetMyMovies(int userid);
        public void DeleteMovie(string title, int movieid);
        public void DeleteMyMovie(int movieid, int userid);
        List<Subscriber> GetUserByMovie(int movieid);
    }
}