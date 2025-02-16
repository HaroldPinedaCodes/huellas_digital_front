"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dog, Cat, Plus } from "lucide-react";
import { getStrapiURL } from "@/lib/utils";

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  birth_date: string;
}

interface PetSelectionProps {
  data: {
    pet: Pet | null;
  };
  onUpdate: (data: { pet: Pet }) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PetSelection: React.FC<PetSelectionProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewPetForm, setShowNewPetForm] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(data.pet);
  const [newPet, setNewPet] = useState({
    name: "",
    species: "",
    breed: "",
    birth_date: "",
  });

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await fetch(`${getStrapiURL()}api/pets`);
      const result = await response.json();
      setPets(result.data);
    } catch {
      setError("Error al cargar las mascotas");
    } finally {
      setLoading(false);
    }
  };

  const handlePetSelect = (pet: Pet) => {
    setSelectedPet(pet);
    onUpdate({ pet });
  };

  const handleNewPetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${getStrapiURL()}api/pets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: newPet }),
      });
      const result = await response.json();
      setPets([...pets, result.data]);
      setShowNewPetForm(false);
      setNewPet({ name: "", species: "", breed: "", birth_date: "" });
      await fetchPets();
    } catch (error) {
      console.error("Error creating pet:", error);
    }
  };

  const getPetIcon = (species: string) => {
    return species.toLowerCase() === "gato" ? (
      <Cat className="w-8 h-8" />
    ) : (
      <Dog className="w-8 h-8" />
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando mascotas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center min-h-[400px] flex flex-col items-center justify-center">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => window.location.reload()} variant="outline">
          Intentar de nuevo
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Selecciona tu mascota</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pets.map((pet) => (
          <Card
            key={pet.id}
            className={`cursor-pointer transition-all ${
              selectedPet?.id === pet.id
                ? "border-2 border-blue-500"
                : "hover:border-blue-200"
            }`}
            onClick={() => handlePetSelect(pet)}
          >
            <CardContent className="p-4 flex items-center space-x-4">
              {getPetIcon(pet.species)}
              <div>
                <h3 className="font-semibold">{pet.name}</h3>
                <p className="text-sm text-gray-600">
                  {pet.breed} • {new Date(pet.birth_date).getFullYear()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card
          className="cursor-pointer hover:border-blue-200"
          onClick={() => setShowNewPetForm(true)}
        >
          <CardContent className="p-4 flex items-center justify-center space-x-2">
            <Plus className="w-6 h-6" />
            <span>Agregar nueva mascota</span>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showNewPetForm} onOpenChange={setShowNewPetForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar nueva mascota</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleNewPetSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={newPet.name}
                onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="species">Especie</Label>
              <Input
                id="species"
                value={newPet.species}
                onChange={(e) =>
                  setNewPet({ ...newPet, species: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="breed">Raza</Label>
              <Input
                id="breed"
                value={newPet.breed}
                onChange={(e) =>
                  setNewPet({ ...newPet, breed: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="birth_date">Fecha de nacimiento</Label>
              <Input
                id="birth_date"
                type="date"
                value={newPet.birth_date}
                onChange={(e) =>
                  setNewPet({ ...newPet, birth_date: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Guardar mascota
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Atrás
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedPet}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};
