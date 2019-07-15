class UserItemsController < ApplicationController
  before_action :set_user

  # GET /users/:user_id/items
  def index
    render json: @user.items
  end

  # GET /users/:user_id/items/1
  def show
    render json: @user.items.find(params[:id])
  end

  # POST /users/:user_id/items
  def create
    puts(params)
    @user_item = UserItem.new(user_item_params)

    if @user_item.save
      render json: @user_item, status: :created
    else
      render json: @user_item.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_items/1
  def update
    if @user_item.update(user_item_params)
      render json: @user_item
    else
      render json: @user_item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_items/1
  def destroy
    @user_item = UserItem.find_by(user_item_params)
    @user_item.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(user_id)
    end

    def user_id
      params[:user_id]
    end

    def item_id
      params[:id] || params[:item_id]
    end

    def user_item_params
      {
        user_id: user_id,
        item_id: item_id
      }
    end
end
