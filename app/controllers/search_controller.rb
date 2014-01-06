require 'rubygems'
require 'json'
require 'net/http'

class SearchController < ApplicationController
  def search
  end

  respond_to :json

  def getMovies
    querytext = params[:query]
    queryURI = URI.parse("http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=#{querytext}page_limit=10&page=1&apikey=7er6em5vc84hq6my9kr3t6ga")
    http = Net::HTTP.new(queryURI.host, queryURI.port)
    request = Net::HTTP::Get.new(queryURI.request_uri)
    response = http.request(request)

    data = response.body
    data = inflate(data) if response["Content-Encoding"] == "gzip"

    render :text => JSON.parse(data)
  end

  def inflate(string)
    gz = Zlib::GzipReader.new(StringIO.new(string))
    gz.read
  end
end
