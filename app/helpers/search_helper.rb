module SearchHelper
	
	def cast_list(movie)
		cast = movie["abridged_cast"]
		names = Array.new(cast.length){|i| cast[i]["name"]} #the name field of each hash in the cast array
		if names.length > 1
			names[0...-1].join(", ") + " and " + names[-1] #join all but the last with ',' and add the last one with 'and'
		elsif names.length == 1
			names[0] #only show the name
		else
			""
		end
	end

	def create_image(name)
		images = {"Fresh" => "fresh.png", "Certified Fresh" => "cfresh.png", "Rotten" => "rotten.png", "Upright" => "upright.png", "Spilled" => "spilled.png"}
		image_tag images[name] unless images[name].nil?
	end


end
