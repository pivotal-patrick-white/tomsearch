require 'rubygems'
require 'json'
require 'net/http'

class SearchController < ApplicationController
	layout :resolve_layout

	def search
	end

	def getMovies
		@resulttype = params[:resulttype].to_i
		@querytext = params[:query]
		@page = params[:page].to_i
		case @resulttype
		when 0
			queryURI = URI.parse("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?limit=10&country=us&apikey=7er6em5vc84hq6my9kr3t6ga")
			@page = -1
		when 1
			queryURI = URI.parse("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=10&page=#{@page}&country=us&apikey=7er6em5vc84hq6my9kr3t6ga")
		when 2
			queryURI = URI.parse("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json?limit=16&country=us&apikey=7er6em5vc84hq6my9kr3t6ga")
			@page = -1
		when 3
			queryURI = URI.parse("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?page_limit=10&page=#{@page}&country=us&apikey=7er6em5vc84hq6my9kr3t6ga");
		when 4
			queryURI = URI.parse("http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=#{@querytext}&page_limit=10&page=#{@page}&apikey=7er6em5vc84hq6my9kr3t6ga")
		end
		http = Net::HTTP.new(queryURI.host, queryURI.port)
		request = Net::HTTP::Get.new(queryURI.request_uri)
		response = http.request(request)

		data = response.body
		data = inflate(data) if response["Content-Encoding"] == "gzip"
		
		@total = JSON.parse(data)["total"]
		@movies = JSON.parse(data)["movies"]
	end

	def getDetails
		@id = params[:id]
		queryURI = URI.parse("http://api.rottentomatoes.com/api/public/v1.0/movies/#{@id}.json?apikey=7er6em5vc84hq6my9kr3t6ga");
		http = Net::HTTP.new(queryURI.host, queryURI.port)
		request = Net::HTTP::Get.new(queryURI.request_uri)
		response = http.request(request)

		data = response.body
		data = inflate(data) if response["Content-Encoding"] == "gzip"

		@movie = JSON.parse(data)
		
	end

	private

	def resolve_layout
		case action_name
		when "getMovies", "getDetails"
			"minimal"
		else
			"application"
		end
	end

	def inflate(string)
		gz = Zlib::GzipReader.new(StringIO.new(string))
		gz.read
	end

end
