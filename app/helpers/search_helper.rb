module SearchHelper

	def cast_list(movie)
		cast = movie["abridged_cast"]
		names = Array.new(cast.length){|i| cast[i]["name"]}
		names[0...-1].join(", ") + " and " + names[-1]
	end

end
