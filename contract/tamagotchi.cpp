#include <eosio/eosio.hpp>
#include <eosio/singleton.hpp>
using namespace eosio;

CONTRACT tamagotchi : public contract {
   public:
      using contract::contract;

      const uint8_t SEC_PER_TICK = 10;

      TABLE Pet {
         uint8_t food;
         uint8_t happiness;
         uint32_t last_ticked;
      };
      
      using pets_table = singleton<"pets"_n, Pet>;

      ACTION create(name owner) {
         require_auth(owner);

         pets_table pets(get_self(), owner.value);

         pets.set(Pet {
            .food = 100,
            .happiness = 100,
            .last_ticked = current_time_point().sec_since_epoch(),
         }, owner);
      }

      ACTION feed(name owner) {
         require_auth(owner);

         pets_table pets(get_self(), owner.value);

         check(pets.exists(), "no_pet");

         Pet pet = tick_pet(pets.get());
         pet.food = std::min(100, pet.food + 10);
         pets.set(pet, owner);
      }

      ACTION play(name owner) {
         require_auth(owner);

         pets_table pets(get_self(), owner.value);

         check(pets.exists(), "no_pet");

         Pet pet = tick_pet(pets.get());
         pet.happiness = std::min(100, pet.happiness + 10);
         pets.set(pet, owner);
      }

      Pet tick_pet(Pet pet) {
         uint32_t now = current_time_point().sec_since_epoch();
         uint32_t elapsed = now - pet.last_ticked;
         uint32_t ticks = elapsed / SEC_PER_TICK;
         uint8_t hits = std::min((uint32_t)255, ticks);

         pet.food = std::max(0, pet.food - hits);
         pet.happiness = std::max(0, pet.happiness - hits);
         pet.last_ticked += ticks * SEC_PER_TICK;

         check(pet.food > 0, "dead_food");
         check(pet.happiness > 0, "dead_happiness");

         return pet;
      }
};