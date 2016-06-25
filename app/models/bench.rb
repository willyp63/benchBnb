class Bench < ActiveRecord::Base
  validates :lat, :lng, :description, presence: true

  def self.in_bounds(bounds)
    coords = [bounds[:northEast][:lat],
              bounds[:southWest][:lat],
              bounds[:northEast][:lng],
              bounds[:southWest][:lng]].map(&:to_f)
    Bench.where("lat < ? AND lat > ? AND lng < ? AND lng > ?", *coords)
  end
end
