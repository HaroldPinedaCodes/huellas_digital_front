"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductGuarantee } from "./product-guarantee";

interface Analysis {
  fat: string;
  fiber: string;
  omega_3: string;
  omega_6: string;
  protein: string;
  taurine?: string;
  vitamin_A?: string;
  vitamin_E?: string;
  probiotics?: string;
  vitamin_D3?: string;
}

interface AgeRanges {
  "2_months": string;
  "9_months": string;
  "3_to_5_months": string;
  "6_to_8_months": string;
}

interface FeedingGuide {
  puppy_small_breeds: {
    [key: string]: AgeRanges;
  };
}

interface ProductFeatures {
  analysis: Analysis;
  feeding_guide: FeedingGuide;
}

interface ProductFeaturesProps {
  features: ProductFeatures;
}

const formatAgeRange = (age: string): string => {
  switch (age) {
    case "2_months":
      return "2 meses";
    case "3_to_5_months":
      return "3 a 5 meses";
    case "6_to_8_months":
      return "6 a 8 meses";
    case "9_months":
      return "9 meses";
    default:
      return age.replace(/_/g, " ");
  }
};

export function ProductFeatures({ features }: ProductFeaturesProps) {
  if (!features) return null;

  return (
    <div className="grid grid-col-1 lg:grid-cols-2 gap-4 justify-cente h-fit">
      {/* Guía de Alimentación */}
      {features.feeding_guide && (
        <div className="flex flex-col gap-4">
          <ProductGuarantee />
          <Card className="mt-0 pt-0 h-fit">
            <CardHeader>
              <CardTitle>Guía de Alimentación</CardTitle>
            </CardHeader>
            <CardContent>
              {features.feeding_guide.puppy_small_breeds && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Cachorros - Razas Pequeñas
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableCell className="font-medium">
                          Peso del perro
                        </TableCell>
                        {/* Usar formatAgeRange para los encabezados */}
                        <TableCell>{formatAgeRange("2_months")}</TableCell>
                        <TableCell>{formatAgeRange("3_to_5_months")}</TableCell>
                        <TableCell>{formatAgeRange("6_to_8_months")}</TableCell>
                        <TableCell>{formatAgeRange("9_months")}</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(
                        features.feeding_guide.puppy_small_breeds
                      ).map(([weightRange, ageRanges]) => (
                        <TableRow key={weightRange}>
                          <TableCell className="font-medium">
                            {weightRange.replace("_", "-").replace("kg", " kg")}
                          </TableCell>
                          <TableCell>{ageRanges["2_months"]}</TableCell>
                          <TableCell>{ageRanges["3_to_5_months"]}</TableCell>
                          <TableCell>{ageRanges["6_to_8_months"]}</TableCell>
                          <TableCell>{ageRanges["9_months"]}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Análisis Garantizado */}
      {features.analysis && (
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Análisis Garantizado</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Proteína</TableCell>
                  <TableCell>{features.analysis.protein}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Grasa</TableCell>
                  <TableCell>{features.analysis.fat}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Fibra</TableCell>
                  <TableCell>{features.analysis.fiber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Omega 3</TableCell>
                  <TableCell>{features.analysis.omega_3}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Omega 6</TableCell>
                  <TableCell>{features.analysis.omega_6}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Taurina</TableCell>
                  <TableCell>{features.analysis.taurine}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Vitamina A</TableCell>
                  <TableCell>{features.analysis.vitamin_A}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Vitamina E</TableCell>
                  <TableCell>{features.analysis.vitamin_E}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Probióticos</TableCell>
                  <TableCell>{features.analysis.probiotics}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Vitamina D3</TableCell>
                  <TableCell>{features.analysis.vitamin_D3}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
