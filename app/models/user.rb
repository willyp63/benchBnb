class User < ActiveRecord::Base
  before_validation :ensure_session_token

  validates :user_name, :session_token, uniqueness: true
  validates(
    :user_name,
    :password_digest,
    :session_token,
    presence: true
  )

  def self.find_by_credentials(user_name, password)
    user = User.find_by(user_name: user_name)
    user && user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password).to_s
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.base64(16)
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.base64(16)
  end
end
