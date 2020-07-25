DROP TABLE IF EXISTS subscriptions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS movie;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name TEXT UNIQUE NOT NULL,
    user_password TEXT NOT NULL,
    permission_level  TEXT NOT NULL
);

CREATE TABLE movie (
    movie_id SERIAL PRIMARY KEY,
    movie_title TEXT UNIQUE NOT NULL,
    movie_description TEXT NOT NULL,
    movie_rating float NOT NULL
);

CREATE TABLE subscriptions (
    subscriber_id INT REFERENCES users(user_id),
	movie_id INT REFERENCES  movie(movie_id)
);



--create or replace function same()returns trigger as $$
--declare u_count int;
--begin
--select count(movie_id) from subscriptions where movie_id = new.movie_id and subscriber_id = new.subscriber_id into u_count;
--if u_count>0
--then
--raise exception 'you cannot add the same movie';
--end if;
--return new;
--end;
--$$ language plpgsql;


--create or replace function five()returns trigger as $$
--declare u_count int;
--begin
--select count(movie_id) from subscriptions where subscriber_id = new.subscriber_id into u_count;
--if u_count>4
--then
--raise exception 'too much subscription';
--end if;
--return new;
--end;
--$$ language plpgsql;


--CREATE TRIGGER five_trigger
--before insert on subscriptions
--for each row execute function five();