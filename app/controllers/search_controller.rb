require 'rubygems'
require 'json'
require 'net/http'

class SearchController < ApplicationController
  layout :resolve_layout

  def search
  end

  def getMovies
    @querytext = params[:query]
    @page = params[:page].to_i
    queryURI = URI.parse("http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=#{@querytext}&page_limit=10&page=#{@page}&apikey=7er6em5vc84hq6my9kr3t6ga")
    http = Net::HTTP.new(queryURI.host, queryURI.port)
    request = Net::HTTP::Get.new(queryURI.request_uri)
    response = http.request(request)

    data = response.body
    data = inflate(data) if response["Content-Encoding"] == "gzip"
    
    @total = JSON.parse(data)["total"]
    @movies = JSON.parse(data)["movies"]
  end

  private

  def resolve_layout
    case action_name
    when "getMovies"
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
