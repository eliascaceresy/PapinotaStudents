class RutValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    record.errors.add(:identification_number, :invalid) unless rut_valid?(value)
  end

  private

    def rut_valid?(value)
      return true if value == "" || value.nil?
      return false if (value !~ /\A(\d{7,8})\-(\d{1}|k|K)\Z/i) && (value !~ /\A(\d{1,3})\.(\d{1,3})\.(\d{1,3})\-(k|K|\d{1})\Z/)

      results = []
      rut = value.strip.split("-").first.delete(".").to_i
      numerical_serie = 2
      while rut > 0
        results.push (rut % 10) * numerical_serie
        rut /= 10
        numerical_serie += 1
        numerical_serie = 2 if numerical_serie > 7
      end
      digit = 11 - (results.inject(:+) % 11)
      digit = if digit == 10
                "k"
              elsif digit == 11
                "0"
              else
                digit.to_s
              end
      if digit == value.strip.split("-").last.downcase
        return true
      else
        return false
      end
    end
end
