class Api::BenchesController < ApplicationController
  def index
    benches = Bench.in_bounds(params[:bounds])
    render json: benches
  end

  def create
    bench = Bench.new(bench_params);
    if bench.save
      render json: bench
    else
      render json: bench.errors.full_messages
    end
  end

  private
  def bench_params
    params.require(:bench).permit(:lat, :lng, :description, :num_seats, :image_url)
  end
end
