import { Button, ButtonIcon, ButtonText } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Annonce {
  _id: string;
  titre: string;
  prix: number;
}

const Annonces = () => {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://192.168.1.13:3000/annonces")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setAnnonces(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        annonces.map((annonce) => (
          <Text key={annonce._id} style={styles.annonceText}>
            {annonce.titre}, {annonce.prix} $
          </Text>
        ))
      )}

      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={true}
      >
        <ButtonText>lE BOUTON DE CON </ButtonText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  annonceText: {
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default Annonces;
