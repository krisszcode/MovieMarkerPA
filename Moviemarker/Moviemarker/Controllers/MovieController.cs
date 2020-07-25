using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moviemarker.Domain;
using System.Net;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Moviemarker.Models;
using Microsoft.AspNetCore.Authorization;

namespace Moviemarker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MovieController : Controller
    {
        private readonly IUserService _userService;

        public MovieController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize]
        [HttpPost]
        [Route("[action]")]
        public void NewFilm([FromForm]string title, [FromForm]string rating, [FromForm]string desc)
        {
            _userService.NewFilm(title, rating, desc);
        }

        [HttpGet]
        [Route("[action]")]
        public List<Movie> ListMovies()
        {
            List<Movie> movies = _userService.GetMovies();
            return movies;
        }

        [Authorize]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddMovie([FromForm]string title)
        {
            var movieid = _userService.GetMovieId(title);
            Console.WriteLine(movieid);
            string username = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
            var userid = _userService.GetUserByName(username);
            var response = Json(_userService.AddMovie(movieid, userid));
            return response;
        }

        [Authorize]
        [HttpGet]
        [Route("[action]")]
        public List<Movie> ListMyMovies()
        {
            string username = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
            var userid = _userService.GetUserByName(username);
            List<Movie> movies = _userService.GetMyMovies(userid);
            return movies;
        }

        [Authorize]
        [HttpDelete]
        [Route("[action]")]
        public void DeleteMovie([FromForm]string title)
        {
            var movieid = _userService.GetMovieId(title);
            _userService.DeleteMovie(title, movieid);
        }

        [Authorize]
        [HttpDelete]
        [Route("[action]")]
        public void DeleteMyMovie([FromForm]string title)
        {
            string username = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
            var userid = _userService.GetUserByName(username);
            var movieid = _userService.GetMovieId(title);
            _userService.DeleteMyMovie(movieid, userid);
        }

        [Authorize]
        [HttpPost]
        [Route("[action]")]
        public List<Subscriber> GetUserByMovie([FromForm]string title)
        {
            Console.WriteLine("EZ A BACKENDEN A TITTEL: " + title);
            var movieid = _userService.GetMovieId(title);
            List<Subscriber> users =  _userService.GetUserByMovie(movieid);
            return users;
        }
    }
}