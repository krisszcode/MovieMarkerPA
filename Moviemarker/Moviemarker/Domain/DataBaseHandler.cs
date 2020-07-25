using System;
using System.Collections.Generic;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Moviemarker.Models;
using Npgsql;

namespace Moviemarker.Domain
{
    public class DataBaseHandler : IUserService
    {

        public static readonly string connectingString = $"Host=localhost;Username=postgres;Password=admin;Database=Moviemarker";

        public int GetUserByName(string userName)
        {
            int user_id = 0;
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT user_id FROM users WHERE user_name='{userName}'", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        user_id = Convert.ToInt32(reader["user_id"]);
                    }
                }
                conn.Close();
            }
            return user_id;
        }

        public bool IsAdmin(string username)
        {
            var is_admin = "";
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT permission_level FROM users WHERE user_name = '{username}'", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        is_admin = Convert.ToString(reader["permission_level"]);
                    }
                }
                conn.Close();
            }

            if (is_admin == "admin")
            {
                return true;
            }
            return false;
        }

        public bool Login(string username, string password)
        {
            string user_name = "";
            string user_password = "";
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT user_name, user_password FROM users WHERE user_name='{username}' AND user_password='{password}'", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        user_name = Convert.ToString(reader["user_name"]);
                        user_password = Convert.ToString(reader["user_password"]);
                    }
                }
                conn.Close();
            }

            if (user_name != "" && user_password != "")
            {
                return true;
            }
            return false;
        }

        public void Register(string username, string password, string usertype)
        {
            try
            {
                using (var conn = new NpgsqlConnection(connectingString))
                {
                    conn.Open();
                    var command = new NpgsqlCommand($"INSERT INTO users(user_name,user_password,permission_level) VALUES ('{username}','{password}','{usertype}')", conn);
                    command.ExecuteNonQuery();
                    conn.Close();
                }

            }

            catch (PostgresException)
            {

                throw new Exception("Username is already used.");
            }
        }

        public void NewFilm(string title, string rating, string desc)
        {
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                var command = new NpgsqlCommand($"INSERT INTO movie(movie_title,movie_description,movie_rating) VALUES ('{title}','{desc}','{rating}')", conn);
                command.ExecuteNonQuery();
                conn.Close();
            }
        }
        public List<Movie> GetMovies()
        {
            List <Movie> movies = new List<Movie>();
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT movie_title, movie_description, movie_rating FROM movie", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Movie movie = new Movie();
                        var movie_title = Convert.ToString(reader["movie_title"]);
                        var movie_desc = Convert.ToString(reader["movie_description"]);
                        string movie_rating = Convert.ToString(reader["movie_rating"]);
                        movie = new Movie(movie_title, movie_desc, movie_rating);
                        movies.Add(movie);
                    }
                }
                conn.Close();
            }
            return movies;
        }

        public string AddMovie(int movieid, int userid)
        {
            try
            {
                using (var conn = new NpgsqlConnection(connectingString))
                {
                    conn.Open();
                    var command = new NpgsqlCommand($"INSERT INTO subscriptions(subscriber_id,movie_id) VALUES ({userid},'{movieid}')", conn);
                    command.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (PostgresException)
            {
                return "CantAdd";
            }
            return "Added";

        }

        public int GetMovieId(string title)
        {
            title = title.Split("id")[1];
            int id = 0;
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT movie_id FROM movie WHERE movie_title='{title}'", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        id = Convert.ToInt32(reader["movie_id"]);
                    }
                }
                conn.Close();
            }
            return id;
        }

        public List<Movie> GetMyMovies(int userid)
        {
            List<Movie> movies = new List<Movie>();
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT movie_title, movie_description, movie_rating FROM movie RIGHT JOIN subscriptions ON movie.movie_id = subscriptions.movie_id WHERE subscriptions.subscriber_id = {userid}", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Movie movie = new Movie();
                        var movie_title = Convert.ToString(reader["movie_title"]);
                        var movie_desc = Convert.ToString(reader["movie_description"]);
                        string movie_rating = Convert.ToString(reader["movie_rating"]);
                        movie = new Movie(movie_title, movie_desc, movie_rating);
                        movies.Add(movie);
                    }
                }
                conn.Close();
            }
            return movies;
        }

        public void DeleteMovie(string title,int movieid)
        {
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                var command1 = new NpgsqlCommand($"DELETE FROM subscriptions WHERE movie_id={movieid}",conn); 
                var command2 = new NpgsqlCommand($"DElETE FROM movie WHERE movie_id = {movieid}", conn);
                command1.ExecuteNonQuery();
                command2.ExecuteNonQuery();
                conn.Close();
            }
        }

        public void DeleteMyMovie(int movieid, int userid)
        {
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                var command = new NpgsqlCommand($"DELETE FROM subscriptions WHERE movie_id={movieid} AND subscriber_id = {userid}", conn);
                command.ExecuteNonQuery();
                conn.Close();
            }
        }

        public List<Subscriber> GetUserByMovie(int movieid)
        {
            List<Subscriber> users = new List<Subscriber>();
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT user_name FROM users JOIN subscriptions ON user_id = subscriber_id WHERE movie_id = {movieid}", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Subscriber sub = new Subscriber();
                        var user_name = Convert.ToString(reader["user_name"]);
                        sub = new Subscriber(user_name);
                        users.Add(sub);
                    }
                }
                conn.Close();
            }
            return users;
        }
        
    }
    
}